import React from "react";
import authServices from "../../Services/AuthServices";
import "./style.css";
import {useNavigate} from "react-router-dom";
function Hero() {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full items-center justify-center header">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Career Span!
      </h1>
      <h2 className="mb-6 text-2xl font-normal text-gray-700 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
      Career Span helps you find your career!
      Here we are waiting for you to come and let us now your skill based on test
      We offer DAT to our customers so they can choose a correct field
      </h2>

      {authServices.isLoggedIn() && authServices.getLoggedInUser().userType==="instructor"?
     <>
     <a
        onClick={()=>{navigate("/app/seller/home")}}
        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
      >
        Open DashBoard
        <svg
          className="ml-2 -mr-1 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </a>
     </>: 

      <a
        type="button"
        onClick={()=>{navigate("/quicktest")}}
        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
      >
        Start Quiz!
        <svg
          className="ml-2 -mr-1 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </a>
}
    </div>
  );
}

export default Hero;
