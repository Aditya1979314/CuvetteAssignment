import { Input } from './Input';
import { ReactComponent as phoneicon } from './Vector.svg';
import { ReactComponent as mailicon } from './mail.svg'


export function Otpverify({emailotp,phoneotp,setemailotp,setphoneotp,handleemailotpsubmit,handlephoneotpsubmit}){



 return (
        <div className="w-1/3 p-3 border-2 border-sky-500 flex flex-col items-center justify-center gap-3">
        <h1 className="text-black text-xl font-bold">Sign Up</h1>
        <div className="text-center text-sm">Lorem Ipsum is simply dummy text</div>
        <Input Svg={phoneicon} placeholder={"Phone Number"} onChange={(e)=>{
            setphoneotp(e.target.value);
        }}/>
        <button className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded w-4/5" onClick={handlephoneotpsubmit}>Verify</button>
        <Input Svg={mailicon} placeholder={"Company Email"} onChange={(e)=>{
            setemailotp(e.target.value);
        }}/>
        <button className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded w-4/5" onClick={handleemailotpsubmit}>Verify</button>
        </div>
      );
}