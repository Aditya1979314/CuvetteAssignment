import express from 'express';
import mongoose from 'mongoose';
import {User} from './db.js';
import {z} from 'zod';
import sendEmail from './helper/Email.js'
import sendOTPSMS from './helper/Phone.js';
import generateOTP from './helper/otp.js';

const app = express();

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));

const userschema = z.object({
    username:z.string(),
    phoneNumber:z.string(),
    email:z.string().email(),
    companyName:z.string(),
    employeeSize:z.number()
})

app.post('/user/signup',async (req,res)=>{
   const {username,phoneNumber,email,companyName,employeeSize} =req.body;

   const validationResult = userschema.safeParse(req.body);

   if (!validationResult.success) {
     return res.status(400).json({ msg: "Input data not valid", errors: validationResult.error.errors });
   }

    try{

        const Useremail = await User.findOne({email});
        const UserPhone = await User.findOne({phoneNumber});
        const UserCompany = await User.findOne({companyName});
      
        if(Useremail){
          return res.status(409).json({"msg":"User email already exists"});
        }
      
        if(UserPhone){
          return res.status(409).json({"msg":"User phone Number already exists"});
        }
      
        if(UserCompany){
          return res.status(409).json({"msg":"Company already exists"});
        }
      
         const newUser = await User.create({
          name:username,
          phoneNumber:phoneNumber,
          email:email,
          companyName:companyName,
          employeeSize:employeeSize
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
      
         return res.status(200).json({"msg":"user created"});
         }catch(err){
          return res.status(500).json({"msg":`some error occured ${err}`})
         }
   })


   app.post('/user/email',async (req,res)=>{
    const {email,otp} = req.body;


    try{
      await sendEmail(email,otp);
      return res.json({"msg":"email sent"});
    }catch(err){
      return res.json({"msg":err});
    }
   })

   app.post('/user/phone',async (req,res)=>{
    const {phone,otp} = req.body;


    try{
      await sendOTPSMS(phone,otp);
      return res.json({"msg":"email sent"});
    }catch(err){
      return res.json({"msg":err});
    }
   })



app.listen(3000,()=>{
    console.log('sever connected');
})