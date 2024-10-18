import Twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const twilioClient = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; 

const sendOTPSMS = async (phoneNumber, otp) => {
    try {
        await twilioClient.messages.create({
            body: `Your OTP code is ${otp}`,
            from: twilioPhoneNumber,
            to: phoneNumber,
        });
        console.log(`OTP sent to ${phoneNumber}`);
    } catch (error) {
        console.error(`Failed to send OTP: ${error.message}`);
    }
};

export default sendOTPSMS; // Use export default for ES modules
