import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();


export const sendEmail = async (recipientEmail, otp) => {
    const serviceID = process.env.EMAILJS_SERVICE_ID;
    const templateID = process.env.EMAILJS_TEMPLATE_ID;
    const userID = process.env.EMAILJS_USER_ID;

    const templateParams = {
        reply_to: recipientEmail,
        name: otp,
    };

    try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service_id: serviceID,
                template_id: templateID,
                user_id: userID,
                template_params: templateParams,
            }),
        });


        if (response.ok) {
            return { success: true, message: 'Email sent successfully' };
        } else {
            throw new Error(data.message || 'Failed to send email');
        }
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: error.message };
    }
};

export const sendJobEmail = async (email,title,description)=>{
    const serviceID = process.env.EMAILJS_SERVICE_ID;
    const templateID = process.env.EMAILJS_JOB_TEMPLATE;
    const userID = process.env.EMAILJS_USER_ID;

    const templateParams = {
        reply_to:email,
        title:title,
        description:description
    };

    try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service_id: serviceID,
                template_id: templateID,
                user_id: userID,
                template_params: templateParams,
            }),
        });


        if (response.ok) {
            return { success: true, message: 'Email sent successfully' };
        } else {
            throw new Error(data.message || 'Failed to send email');
        }
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: error.message };
    }
}