# Steps to start the project
## step1 - install nodejs 
## step2 - clone the repo 
## step 3 -create a .env file in the backend folder containing

DATABASE_URL=<your-database-url>  # MongoDB database URL
JWT_SECRET=<your-jwt-secret>  # JWT secret
EMAILJS_USER_ID=<your-emailjs-user-id>  # Public key of the EmailJS ID
EMAILJS_TEMPLATE_ID=<your-emailjs-template-id-for-otp>  # EmailJS template ID for OTP
EMAILJS_JOB_TEMPLATE=<your-emailjs-template-id-for-job-posting>  # EmailJS template ID for job posting
EMAILJS_SERVICE_ID=<your-emailjs-service-id>  # EmailJS service ID
TWILIO_ACCOUNT_SID=<your-twilio-account-sid>  # Twilio account SID
TWILIO_AUTH_TOKEN=<your-twilio-auth-token>  # Twilio auth token
TWILIO_PHONE_NUMBER=<your-twilio-phone-number>  # Twilio phone number


## step4 - In the root directory type the command 
1. cd Backend
2. npm install
3. npm run start
   (this will start the backend)
## step 5 - In the root directory type the command
1. cd Frontend/my-app
2. npm install
3. npm run start
