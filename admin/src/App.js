import React from "react";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Products from "./components/tests/TestList";
import SignIn from "./components/SignIn";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StakeholderMapper from "./components/StakeholderMapper";
import adminServices from "./Services/AdminServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div>
        <Navbar></Navbar>
        <ToastContainer
          autoClose={1000}
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
        <Routes>
          <Route
            path="/instructors"
            element={
              <StakeholderMapper
                method={adminServices.getInstructors}
                dataType={"instructors"}
              />
            }
          />

          <Route
            path="/candidates"
            element={
              <StakeholderMapper
                method={adminServices.getCandidates}
                dataType={"candidates"}
              />
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/tests" element={<Products />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
