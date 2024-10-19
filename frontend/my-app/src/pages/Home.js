import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import SignupCompany from "../components/SignupCompany";
import {Otpverify} from "../components/Otpverify";
import { createHashRouter, useNavigate } from "react-router-dom";
import { captureRejectionSymbol } from "events";

export function Home() {
  // State for each input field
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [employeeSize, setEmployeeSize] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const[phoneotp,setphoneotp] = useState('');
  const[emailotp,setemailotp] = useState('');
  const[isEmailVerified,setisemailverified] = useState(false);
  const[isPhoneVerified,setisphoneverified] = useState(false);
    const navigate = useNavigate();

useEffect(()=>{
login();
},[isEmailVerified,isPhoneVerified])

async function login(){
    const email = localStorage.getItem('email');
const response = await fetch('http://localhost:3000/user/signin',{
    method: "GET",
        headers: {
          "Content-Type": "application/json",
            "email":email
        },
})

const result = await response.json();
if(result.token){
    localStorage.setItem('token',result.token);
  navigate('/dashboard')
}
}

  // onClick handler for the button
  const handleSubmit = async () => {
   
    // If all checks pass, proceed with form submission
    setErrorMessage("");

     
    // Prepare the data for the POST request
    const signupData = {
      username: name,
      email: companyEmail,
      phoneNumber: phone,
      companyName: companyName,
      employeeSize: parseInt(employeeSize) // Ensure employeeSize is a number
    };

    try {
      // Perform the POST request
      const response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData), // Convert the data to JSON string
      })
      const result = await response.json();
      localStorage.setItem('email',companyEmail);
      alert(result.msg);
      setIsSignupSuccess(true);
    }catch(err){
        alert("some error occured");
      };
  };

async function  handleemailotpsubmit() {
    const email = localStorage.getItem('email');
    try{
        const response = await fetch('http://localhost:3000/user/email',{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email":email,
                "otp":emailotp
               })
        })
    
        const result = await response.json();
        alert(result.msg);
        if(result.msg === "Phone number verified"){
          setisphoneverified(true);
        }
    }catch(err){
        console.log("error occured");
    }
   
}

async function handlephoneotpsubmit() {
    const email = localStorage.getItem('email');
    try{
        const response = await fetch('http://localhost:3000/user/phone',{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email":email,
                "otp":phoneotp
               })
        })
    
        const result = await response.json();
        alert(result.msg)
        if(result.msg === "Email verified"){
          setisemailverified(true);
        }
    }catch(err){
        console.log("error occured");
    }
}

  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex justify-around p-16">
        <div className="w-1/2 h-5/6 flex flex-col items-center justify-center">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley
        </div>

        {/* Conditionally render SignupCompany or OtpVerify */}
        {!isSignupSuccess ? (
          <SignupCompany
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            companyName={companyName}
            setCompanyName={setCompanyName}
            companyEmail={companyEmail}
            setCompanyEmail={setCompanyEmail}
            employeeSize={employeeSize}
            setEmployeeSize={setEmployeeSize}
            handleSubmit={handleSubmit}
            errorMessage={errorMessage}
          />
        ) : (
          <Otpverify emailotp={emailotp} setemailotp={setemailotp} phoneotp={phoneotp} setphoneotp={setphoneotp} handleemailotpsubmit={handleemailotpsubmit} handlephoneotpsubmit={handlephoneotpsubmit}/>
        )}
      </div>
    </div>
  );
}
