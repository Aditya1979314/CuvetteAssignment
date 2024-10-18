import mongoose from "mongoose";
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  employeeSize: {
    type: Number,
    required: true
  },
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  otpEmail: { type: String },
  otpPhone: { type: String },
  otpEmailExpires: { type: Date }, 
  otpPhoneExpires: { type: Date }, 
  jobs: [
    {
      type:Schema.Types.ObjectId,
      ref:'Job'
    }
  ]
});


const JobSchema = new Schema({
    title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      experienceLevel: {
        type: String,
        required: true
      },
      candidate: {
        type: [String], 
        required: true
      },
      date: {
        type: Date
      }
});


export const User = mongoose.model('User', UserSchema);
export const Job = mongoose.model('Job', JobSchema);


