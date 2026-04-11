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
import BloodbankDashboard from "./components/bloodbank/BloodbankDashboard";
import BloodRequest from './components/BloodRequest/BloodRequest';
import Donate from './components/Donate/Donate';
import Event from './components/Event/Event';
import Footer from './components/footer/footer';
import DonorRegister from './components/Register/DonorRegister.jsx';
import RequestForm from './components/BloodRequest/RequestForm.jsx';
import RequestResults from './components/BloodRequest/RequestResults.jsx';
import ProtectedRoute from "./components/common/ProtectedRoute";
import MyAccount from "./components/users/MyAccount";
import HospitalAccount from "./components/users/HospitalAccount";
import BloodbankAccount from "./components/users/BloodbankAccount";
import Privacy from './components/Privacy/Privacy.jsx';
import Terms from './components/Terms/Terms.jsx';
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
         <Route path="/bloodbank/dashboard" element={<BloodbankDashboard />} />
         <Route path="/donate" element={<Donate />} /> 
         <Route path="/event" element={<Event />} /> 
          <Route path="/bloodrequest" element={<BloodRequest />} /> 
          <Route path="/donorregister" element={<DonorRegister />} /> 
          <Route path="/PostRequest" element={<RequestForm />} />
          <Route path="/hospital/account" element={<HospitalAccount />} />
          <Route path="/bloodbank/account" element={<BloodbankAccount />} />
          <Route path="/privacy" element={<Privacy />} />
           <Route path="/Terms" element={<Terms />} />

           <Route path="/account" element={
          <ProtectedRoute>
            <MyAccount />
          </ProtectedRoute>
        } />

        {/* 🔒 PROTECTED ROUTES */}
        <Route path="/bloodrequest" element={
          <ProtectedRoute>
            <BloodRequest />
          </ProtectedRoute>
        } />

        <Route path="/donate" element={
          <ProtectedRoute>
            <Donate />
          </ProtectedRoute>
        } />

        <Route path="/event" element={
          <ProtectedRoute>
            <Event />
          </ProtectedRoute>
        } />

        <Route path="/donorregister" element={
          <ProtectedRoute>
            <DonorRegister />
          </ProtectedRoute>
        } />

        <Route path="/PostRequest" element={
          <ProtectedRoute>
            <RequestForm />
          </ProtectedRoute>
        } />

          <Route path="/results/:city/:bloodGroup" element={<RequestResults />} /> 
      </Routes>
    </Router>
  );
}

export default App;
