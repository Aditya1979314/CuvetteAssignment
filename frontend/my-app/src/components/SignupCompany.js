import React from "react";
import { ReactComponent as groupicon } from './groups.svg';
import { ReactComponent as mailicon } from './mail.svg';
import { ReactComponent as personicon } from './Person icon.svg';
import { ReactComponent as phoneicon } from './Vector.svg';
import { Input } from "./Input";

const SignupCompany = ({ 
  name, setName, 
  phone, setPhone, 
  companyName, setCompanyName, 
  companyEmail, setCompanyEmail, 
  employeeSize, setEmployeeSize, 
  handleSubmit, 
  errorMessage 
}) => {

  // onChange handlers for each input
  const handleNameChange = (e) => setName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleCompanyNameChange = (e) => setCompanyName(e.target.value);
  const handleCompanyEmailChange = (e) => setCompanyEmail(e.target.value);
  const handleEmployeeSizeChange = (e) => setEmployeeSize(e.target.value);

  return (
    <div className="w-1/3 p-3 border-2 border-sky-500 flex flex-col items-center justify-center gap-3">
      <h1 className="text-black text-xl font-bold">Sign Up</h1>
      <div className="text-center text-sm">Lorem Ipsum is simply dummy text</div>
      
      {/* Inputs with onChange handlers */}
      <Input Svg={personicon} placeholder={"Name"} value={name} type={'text'} onChange={handleNameChange} />
      <Input Svg={phoneicon} placeholder={"Phone Number"} value={phone} type={'text'} onChange={handlePhoneChange} />
      <Input Svg={personicon} placeholder={"Company Name"} value={companyName} type={'text'} onChange={handleCompanyNameChange} />
      <Input Svg={mailicon} placeholder={"Company Email"} value={companyEmail} type={'text'} onChange={handleCompanyEmailChange} />
      <Input Svg={groupicon} placeholder={"Employee Size"} value={employeeSize} type={'number'} onChange={handleEmployeeSizeChange} />
      
      {/* Display error message if validation fails */}
      {errorMessage && <div className="text-red-500 text-xs">{errorMessage}</div>}
      
      <div className="w-3/5 text-center text-xs">
        By clicking on proceed you will accept our 
        <span className="text-blue-500"> Terms</span> & <span className="text-blue-500"> Conditions</span>
      </div>
      
      <button
        className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded w-4/5"
        onClick={handleSubmit}
      >
        Proceed
      </button>
    </div>
  );
};

export default SignupCompany;
