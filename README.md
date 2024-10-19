##Steps to start the project
step1 - install nodejs 
step2 - clone the repo 
step 3 -create a .env file in the backend folder containing

DATABASE_URL (database url from the mongodb database)
JWT_SECRET (jwt secret)
EMAILJS_USER_ID (public key of the emailjs id)
EMAILJS_TEMPLATE_ID (emailjs template id for otp)
EMAILJS_JOB_TEMPLATE (emailjs template id for job posting)
EMAILJS_SERVICE_ID (emailjs service id )
TWILIO_ACCOUNT_SID (twilio accound sid)
TWILIO_AUTH_TOKEN (twilio auth token)
TWILIO_PHONE_NUMBER (twilio phone number)

step3 - In the root directory type the command 
1. cd Backend
2. npm install
3. npm run start
   (this will start the backend)
step 4 - In the root directory type the command
1. cd Frontend/my-app
2. npm install
3. npm run start
