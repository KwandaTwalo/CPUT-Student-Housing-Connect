import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandlordLogin from "./pages/Landlord/LandlordAuth/LandlordLogin";
import LandlordSignUp from "./pages/Landlord/LandlordAuth/LandlordSignUp";
import LandlordDashboard from "./pages/Landlord/LandlordDashboard";
import MyListings from "./pages/Landlord/MyListings/MyListings";
import AddListing from "./pages/Landlord/AddListings/AddListing";
import AssignAccommodation from "./pages/Landlord/AssignAccommodation/AssignAccommodation";
import ApplicationsRequests from "./pages/Landlord/ApplicationRequests/ApplicationRequests";
import LandlordProfile from "./pages/Landlord/LndlordProfile";
import EditProfile from "./pages/Landlord/EditProfile";
import AdminDashboard from "./pages/Administrator/Dashboard/Dashboard";
import AdminSignUp from "./pages/Administrator/AdminSignUp/AdminSignUp";
import VerifyLandlords from "./pages/Administrator/VerifyLandlords/VerifyLandlords";
import VerifyListings from "./pages/Administrator/VerifyListings/VerifyListings";


import LandingPage from "./pages/Shared/LandingPage";
import LoginPage from "./pages/Shared/Login";
import SignUpPage from "./pages/Shared/SignUp"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Landlord routes */}
        <Route path="/landlord/login" element={<LandlordLogin />} />
        <Route path="/landlord/signup" element={<LandlordSignUp />} />
        <Route path="/landlord-profile" element={<LandlordProfile />} />
        <Route path="/landlord/dashboard" element={<LandlordDashboard />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/add-listing" element={<AddListing />} />
        <Route path="/applications-requests" element={<ApplicationsRequests />} />
        <Route path="/assign-accommodation" element={<AssignAccommodation />} />
        <Route path="/edit-profile" element={<EditProfile />} />


        {/* Administrator routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/signup" element={<AdminSignUp />} />
          <Route path="/admin/verify-landlords" element={<VerifyLandlords />} />
          <Route path="/admin/verify-listings" element={<VerifyListings />} />

      </Routes>
    </Router>
  );
}

export default App;
