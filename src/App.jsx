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
import Donate from './components/Donate/Donate';
import Footer from './components/footer/footer';


function App() {
  return (
    <Router>
      <Navbar />

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
         <Route path="/donate" element={<Donate />} /> 
      </Routes>

      <Footer/>
    </Router>
  );
}

export default App;
