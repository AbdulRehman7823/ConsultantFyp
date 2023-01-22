import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FrontPage from './components/Pages/FrontPage'
import LoginPage from './components/Pages/LoginPage';
import SignupPage from './components/Pages/SignupPage';
import ContactPage from './components/Pages/ContactPage';
import SellerHomePage from './components/Pages/SellerPages/SellerHomePage';
import SellerAddComponentPage from './components/Pages/SellerPages/SellerAddComponentPage';
import SellerDeleteComponentPage from './components/Pages/SellerPages/SellerDeleteComponentPage';
import SellerSubscriberPage from './components/Pages/SellerPages/SellerSubscriberPage';
import SellerProfilePage from './components/Pages/SellerPages/SellerProfilePage';

import InstructorCardList from "./components/Instructor/InstructorCardList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestList from "./components/Tests/TestsList";
import InstructorTestsList from "./components/Instructor/InstructorTestsList";
import BuySubscription from "./components/Instructor/BuySubscription";
import Navbar from './components/FrontPageComponents/Navbar/Navbar'
import Footer from './components/FrontPageComponents/Footer/Footer';
import AboutUs from './components/AboutUs/AboutUs';
import PlayQuiz from './components/QuickTest/PlayQuiz'
import PlayQuiz2 from './components/Tests/PlayQuiz2'
import ForgotPassword from './components/ForgotPassword';
import PasswordReset from "./components/PasswordReset";
import EmailVerify from './components/EmailVerify';
import Success from './components/payment/Success';
import Cancel from './components/payment/Cancel';


function App() {
  return (
    <Router>
            

      <ToastContainer
        autoClose={1000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
     
      <Routes>
      <Route
          path="/users/:id/verify/:token"
          element={
            <>
              <Navbar />
              <EmailVerify />
            </>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
      
        <Route path="/" element={<><Navbar/><FrontPage/></>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element = {<SignupPage></SignupPage>}/>
        <Route path="/contactus" element = {<><Navbar/><ContactPage/></>}/>
        <Route path="/aboutus" element = {<><Navbar/><AboutUs/></>}/>
        <Route path="/quicktest" element = {<PlayQuiz/>}/>
        <Route path="/quicktest2" element = {<PlayQuiz2/>}/>
        <Route path="/app/seller/home" element={<SellerHomePage/>}/>
         <Route path="/app/seller/add" element={<SellerAddComponentPage/>}/>
         <Route path="/app/seller/delete" element={<SellerDeleteComponentPage/>}/>
         <Route path="/app/seller/profile" element={<SellerProfilePage />} />

         <Route path="/app/seller/subscribers" element={<SellerSubscriberPage/>}/>

         <Route path="/instructors" element={<><Navbar/><InstructorCardList /></>} />
        <Route path="/tests" element={<><Navbar/><TestList /></>} />
        <Route path="/instructors/tests" element={<><Navbar/><InstructorTestsList /></>} />
        <Route path="/instructors/buysubscription" element={<><Navbar/><BuySubscription /></>} />
        
        <Route path="/payment/success/:id" element={<><Success /></>} />
        <Route path="/payment/cancel" element={<><Cancel /></>} />

      
        
      </Routes>
      <Footer></Footer>
    </Router>
  )
}
export default App