# Steps to start the project
## step1 - install nodejs 
## step2 - clone the repo 
## step 3 -create a .env file in the backend folder containing

1.DATABASE_URL=<your-database-url>  # MongoDB database URL
2. JWT_SECRET=<your-jwt-secret>  # JWT secret
3. EMAILJS_USER_ID=<your-emailjs-user-id>  # Public key of the EmailJS ID
4. EMAILJS_TEMPLATE_ID=<your-emailjs-template-id-for-otp>  # EmailJS template ID for OTP
5. EMAILJS_JOB_TEMPLATE=<your-emailjs-template-id-for-job-posting>  # EmailJS template ID for job posting
6. EMAILJS_SERVICE_ID=<your-emailjs-service-id>  # EmailJS service ID
7. TWILIO_ACCOUNT_SID=<your-twilio-account-sid>  # Twilio account SID
8. TWILIO_AUTH_TOKEN=<your-twilio-auth-token>  # Twilio auth token
9. TWILIO_PHONE_NUMBER=<your-twilio-phone-number>  # Twilio phone number


## step4 - In the root directory type the command 
1. cd Backend
2. npm install
3. npm run start
   (this will start the backend)
## step 5 - In the root directory type the command
1. cd Frontend/my-app
2. npm install
3. npm run start
