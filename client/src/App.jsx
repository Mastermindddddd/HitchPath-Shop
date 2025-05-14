import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation }  from "react-router-dom";
import ButtonGradient from "./assets/svg/ButtonGradient";
import { AuthProvider } from "./AuthContext";
import RegisterPage from "./pages/register";
import Login from "./pages/login";
import Layout from "./layout";
import { initializeGA, logPageView } from "./googleAnalytics";
import { GoogleOAuthProvider } from '@react-oauth/google';
import LearnCertify from "./pages/learnCertify";
import ProductPage from "./pages/product";
import AdminCourseManager from "./pages/AdminCourseManager";
import AdminWorkEssentialsManager from "./pages/AdminWorkEssentialsManager";

const App = () => {  
  useEffect(() => {
    initializeGA();
    logPageView(); 
  }, []);

  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AnalyticsTracker />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<Login />} />
            {/*<Route path="/dashboard" element={<DashboardPage />} />*/}
            <Route path="/learn-and-certify" element={<LearnCertify />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/Course-Admin" element={<AdminCourseManager />} />
            <Route path="/Work-Essentials-Admin" element={<AdminWorkEssentialsManager />} />
          </Route>
        </Routes>
      <ButtonGradient />
      </GoogleOAuthProvider>
    </AuthProvider>
  );
};

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Ensure GA is initialized before sending page view
    if (window.gtag) {
      logPageView(location.pathname);
    }
  }, [location]);

  return null;
};


export default App;
