import React from "react";
import TestTypes from "../FrontPageComponents/TestTypes/TestTypes"

function AboutUs() {
  return (
    <div className="bg-gray-900 flex justify-center flex-col w-full  ">
    <div className="py-36 px-72 items-center justify-center">
      <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
        We invest in the{" "}
        <span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-yellow-400">
          world’s Careers
        </span>
      </h1>
      <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
       We offers Best tests yo judge our canditates professions!
      </p>
      </div>
      <div>
        <TestTypes></TestTypes>
      </div>

    </div>
  );
}

export default AboutUs;
