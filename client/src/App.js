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
import SellerRequestPages from './components/Pages/SellerPages/SellerRequestPages';
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


function App() {
  return (
    <Router>
            

      <ToastContainer
        autoClose={1000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<FrontPage></FrontPage>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element = {<SignupPage></SignupPage>}/>
        <Route path="/contactus" element = {<ContactPage/>}/>
        <Route path="/aboutus" element = {<AboutUs/>}/>
        <Route path="/quicktest" element = {<PlayQuiz/>}/>
        <Route path="/quicktest2" element = {<PlayQuiz2/>}/>
        <Route path="/app/seller/home" element={<SellerHomePage/>}/>
         <Route path="/app/seller/add" element={<SellerAddComponentPage/>}/>
         <Route path="/app/seller/delete" element={<SellerDeleteComponentPage/>}/>
         <Route path="/app/seller/profile" element={<SellerRequestPages/>}/>
         <Route path="/app/seller/subscribers" element={<SellerSubscriberPage/>}/>

         <Route path="/instructors" element={<InstructorCardList />} />
        <Route path="/tests" element={<TestList />} />
        <Route path="/instructors/tests" element={<InstructorTestsList />} />
        <Route path="/instructors/buysubscription" element={<BuySubscription />} />
        
        
      </Routes>
      <Footer></Footer>
    </Router>
  )
}
export default App