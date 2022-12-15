import React from "react";
import { useNavigate,useLocation } from "react-router-dom";

function TestCard({ test }) {

  const navigation = useNavigate();
  const handler=()=>{
    navigation("/quicktest2", { state: { test: test } });
  }

  return (
    <div className="p-2 card"  onClick={handler}>
    <a className="card flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img
        className="object-cover w-full rounded-t-lg md:h-56 md:w-48 md:rounded-none md:rounded-l-lg"
        src={test.img}
        alt=""
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl  font-bold tracking-tight text-gray-900 dark:text-white">
          {test.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {test.description}
        </p>
        <p className="mb-3 font-bold text-gray-600 dark:text-gray-400 ">
          {test.testType}
        </p>
      </div>
    </a>
  </div>
  );
}

export default TestCard;
