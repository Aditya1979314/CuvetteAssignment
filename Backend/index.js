import express from 'express';
import mongoose from 'mongoose';
import { Job, User } from './db.js';
import { z } from 'zod';
import {sendEmail,sendJobEmail} from './helper/Email.js';
import sendOTPSMS from './helper/Phone.js';
import generateOTP from './helper/otp.js';
import jwt from 'jsonwebtoken';
import { userauth } from './middleware/auth.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));

const userschema = z.object({
  username: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  companyName: z.string(),
  employeeSize: z.number()
});

const jobschema = z.object({
  jobTitle: z.string(),
  jobDescription: z.string(),
  candidate: z.array(z.string().email()),
  experienceLevel: z.string(),
  date: z.string()
});

app.post('/user/signup', async (req, res) => {
  const { username, phoneNumber, email, companyName, employeeSize } = req.body;

  const validationResult = userschema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(422).json({ msg: "Input data not valid", errors: validationResult.error.errors });
  }

  try {
    const Useremail = await User.findOne({ email });
    const UserPhone = await User.findOne({ phoneNumber });
    const UserCompany = await User.findOne({ companyName });

    if (Useremail) {
      return res.status(409).json({ "msg": "User email already exists" });
    }

    if (UserPhone) {
      return res.status(409).json({ "msg": "User phone number already exists" });
    }

    if (UserCompany) {
      return res.status(409).json({ "msg": "Company already exists" });
    }

    const newUser = await User.create({
      name: username,
      phoneNumber: phoneNumber,
      email: email,
      companyName: companyName,
      employeeSize: employeeSize
    });

    const otpEmail = generateOTP();
    const otpPhone = generateOTP();
    newUser.otpEmail = otpEmail;
    newUser.otpPhone = otpPhone;
    newUser.otpEmailExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    newUser.otpPhoneExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    await newUser.save();

    await sendEmail(email, otpEmail);
    await sendOTPSMS(phoneNumber, otpPhone);

    return res.status(201).json({ "msg": "User created" });
  } catch (err) {
    return res.status(500).json({ "msg": `Some error occurred: ${err}` });
  }
});

app.post('/user/reemail', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    const otpEmail = generateOTP();
    user.otpEmail = otpEmail;
    user.otpEmailExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    await sendEmail(email, otpEmail);
    return res.status(200).json({ "msg": "OTP sent to email" });
  } catch (err) {
    return res.status(500).json({ "msg": "Some error occurred" });
  }
});

app.post('/user/email', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ "msg": "User does not exist" });
    }

    if (user.otpEmail !== otp) {
      return res.status(400).json({ "msg": "Incorrect OTP" });
    }

    if (Date.now() > user.otpEmailExpires) {
      return res.status(410).json({ "msg": "OTP expired" });
    }

    await User.updateOne({ email }, { isEmailVerified: true });
    return res.status(200).json({ "msg": "Email verified" });
  } catch (err) {
    return res.status(500).json({ "msg": `Some error occurred: ${err}` });
  }
});

app.post('/user/phone', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ "msg": "User does not exist" });
    }

    if (user.otpPhone !== otp) {
      return res.status(400).json({ "msg": "Incorrect OTP" });
    }

    if (Date.now() > user.otpPhoneExpires) {
      return res.status(410).json({ "msg": "OTP expired" });
    }

    await User.updateOne({ email }, { isPhoneVerified: true });
    return res.status(200).json({ "msg": "Phone number verified" });
  } catch (err) {
    return res.status(500).json({ "msg": `Some error occurred: ${err}` });
  }
});

app.post('/user/rephone', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    const phoneNumber = user.phoneNumber;
    const otpPhone = generateOTP();
    user.otpPhone = otpPhone;
    user.otpPhoneExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    await sendOTPSMS(phoneNumber, otpPhone);
    return res.status(200).json({ "msg": "OTP sent to phone" });
  } catch (err) {
    return res.status(500).json({ "msg": "Some error occurred" });
  }
});

app.get('/user/signin', async (req, res) => {
  const email = req.headers.email;

  try {
    const user = await User.findOne({ email });

    if (user.isPhoneVerified && user.isEmailVerified) {
      const token = jwt.sign({ userid: user.id }, process.env.JWT_SECRET);
      return res.status(200).json({ "token": token });
    } else {
      return res.status(403).json({ "msg": "Phone or email not verified" });
    }
  } catch (err) {
    return res.status(500).json({ "msg": "Some error occurred" });
  }
});

app.post('/user/jobpost', userauth, async (req, res) => {
  const { jobTitle, jobDescription, experienceLevel, date, candidate } = req.body;
  const userid = req.userid;
  
  const validationResult = jobschema.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(422).json({ "msg": "Input data not valid" });
  }

  try {
    const job = await Job.create({
      title: jobTitle,
      description: jobDescription,
      experienceLevel: experienceLevel,
      date: new Date(date),
      candidate: candidate
    });

    await User.updateOne({ _id: userid }, {
      $push: { jobs: job.id }
    });

    for (const email of candidate) {
      await sendJobEmail(email, jobTitle, jobDescription);
    }

    return res.status(201).json({ "msg": "Job post created" });
  } catch (err) {
    return res.status(500).json({ "msg": `Some error occurred: ${err}` });
  }
});

app.listen(3000, () => {
  console.log('Server connected');
});
