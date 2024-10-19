import { Dashboardnavbar } from "./components/Dashboardnavbar";
import { Navbar } from "./components/Navbar";
import { Otpverify } from "./components/Otpverify";
import SignupCompany from "./components/SignupCompany";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import {BrowserRouter, Route,Routes} from 'react-router-dom';

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/dashboard" element={<Dashboard/>}/> 
     <Route path="/home" element={<Home/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
