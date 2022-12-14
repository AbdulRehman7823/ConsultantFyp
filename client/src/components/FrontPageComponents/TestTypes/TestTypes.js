import React from "react";

import { useNavigate } from "react-router-dom"; 
function Poetries() {

  const navigate = useNavigate()
  return (
    <div>
      <section class="bg-gray-800 text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-100">
              DAT Categories
            </h1>
            <p class="lg:w-1/2 w-full leading-relaxed text-gray-300">
              DAT is a combination of different levels of tests, So there are Eight Different Levels
            </p>
          </div>
          <div class="flex flex-wrap -m-4 ">
            <div class="xl:w-1/3 md:w-1/2 p-4 ">
              <div class="border border-gray-200 p-6 rounded-lg bg-gray-900 shadow-lg">
                <h2 class="text-lg text-gray-100 font-medium title-font mb-2">
                Verbal Reasoning
                </h2>
                <p class="leading-relaxed text-gray-200 text-md">
                  A type of test having questions related to Verbal Reasoning!
                </p>
              </div>
            </div>
            <div class="xl:w-1/3 md:w-1/2 p-4">
              <div class="border border-gray-200 p-6 rounded-lg bg-gray-900 shadow-lg">
                <h2 class="text-lg text-gray-100 font-medium title-font mb-2">
                Numerical Reasoning
                </h2>
                <p class="leading-relaxed text-gray-200 text-md">
                A type of test having questions related to Verbal Reasoning!
                </p>
              </div>
            </div>
            <div class="xl:w-1/3 md:w-1/2 p-4">
              <div class="border border-gray-200 p-6 rounded-lg bg-gray-900 shadow-lg">
                <h2 class="text-lg text-gray-100 font-medium title-font mb-2">
                Abstract Reasoning
                </h2>
                <p class="leading-relaxed text-gray-200 text-md">
                A type of test having questions related to Abstract Reasoning!
                visualizing different shapes and solving problems
                </p>
              </div>
            </div>
            <div class="xl:w-1/3 md:w-1/2 p-4">
              <div class="border border-gray-200 p-6 rounded-lg bg-gray-900 shadow-lg">
                <h2 class="text-lg text-gray-100 font-medium title-font mb-2">
                Mechanical Reasoning
                </h2>
                <p class="leading-relaxed text-gray-200 text-md">
                A type of test having questions related to Mechanical Reasoning!
                </p>
              </div>
            </div>
            <div class="xl:w-1/3 md:w-1/2 p-4">
              <div class="border border-gray-200 p-6 rounded-lg bg-gray-900 shadow-lg">
                <h2 class="text-lg text-gray-100 font-medium title-font mb-2">
                Space Relation
                </h2>
                <p class="leading-relaxed text-gray-200 text-md">
                A type of test having questions related to Space Relation!
                </p>
              </div>
            </div>
            <div class="xl:w-1/3 md:w-1/2 p-4">
              <div class="border border-gray-200 p-6 rounded-lg bg-gray-900 shadow-lg">
                <h2 class="text-lg text-gray-100 font-medium title-font mb-2">
                Spelling
                </h2>
                <p class="leading-relaxed text-gray-200 text-md">
                A type of test having questions related to Spelling!
                </p>
              </div>
            </div>
            <div class="xl:w-1/3 md:w-1/2 p-4">
              <div class="border border-gray-200 p-6 rounded-lg bg-gray-900 shadow-lg">
                <h2 class="text-lg text-gray-100 font-medium title-font mb-2">
                Language usage
                </h2>
                <p class="leading-relaxed text-gray-200 text-md">
                A type of test having questions related to Language usage!
                </p>
              </div>
            </div>
            <div class="xl:w-1/3 md:w-1/2 p-4">
              <div class="border border-gray-200 p-6 rounded-lg bg-gray-900 shadow-lg">
                <h2 class="text-lg text-gray-100 font-medium title-font mb-2">
                Clerical speed and accuracy
                </h2>
                <p class="leading-relaxed text-gray-200 text-md">
                A type of test having questions related to Clerical speed and accuracy!
                </p>
              </div>
            </div>
          </div>
          <button         onClick={()=>{navigate("/quicktest")}}
 class="flex mx-auto mt-16 text-white bg-yellow-400 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-500 rounded-lg text-2xl py-4 shadow-lg">
            Want a Quick Test?
          </button>
        </div>
      </section>
    </div>
  );
}

export default Poetries;
