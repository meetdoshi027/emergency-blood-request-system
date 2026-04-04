import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './components/pages/Home.jsx';
import Navbar from './components/Navbar/Navbar';
import Indlogin from './components/Login/Indlogin';
import IndRegister from "./components/Register/IndRegister";
import OrgRegister from "./components/Register/OrgRegister";
import Contactus from './components/pages/Contactus.jsx';
import Aboutus from './components/Aboutus/Aboutus';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import UserDashboard from "./components/user/UserDashboard";
import HospitalDashboard from "./components/hospital/HospitalDashboard";
import BloodRequest from './components/BloodRequest/BloodRequest';
import Donate from './components/Donate/Donate';
import Event from './components/Event/Event';
import Footer from './components/footer/footer';
import DonorRegister from './components/Register/DonorRegister.jsx';
import RequestForm from './components/BloodRequest/RequestForm.jsx';
import RequestResults from './components/BloodRequest/RequestResults.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />  
        <Route path="/" element={<Indlogin />} />
        <Route path="/login" element={<Indlogin />} />
        <Route path="/register/individual" element={<IndRegister />} />
        <Route path="/register/organization" element={<OrgRegister />} />
         <Route path="/aboutus" element={<Aboutus />} /> 
        <Route path="/contactus" element={<Contactus />} /> 
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
         <Route path="/donate" element={<Donate />} /> 
         <Route path="/event" element={<Event />} /> 
          <Route path="/bloodrequest" element={<BloodRequest />} /> 
          <Route path="/donorregister" element={<DonorRegister />} /> 
          <Route path="/PostRequest" element={<RequestForm />} />
          <Route path="/results/:city/:bloodGroup" element={<RequestResults />} /> 
      </Routes>
    </Router>
  );
}

export default App;
