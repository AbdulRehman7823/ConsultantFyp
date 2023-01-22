import React, { useEffect, useState } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import TestCard from "../Tests/TestCard";
import { useLocation, useNavigate } from "react-router-dom";
import InstructorServices from "../Services/InstructorServices";
const InstructorTestsList = () => {
  const location = useLocation();
  const [loading, setLoading] = React.useState(false);
  const [instructor, setInstructor] = useState(location.state.instructor);
  const navigation = useNavigate();
  const [tests, setTests] = React.useState([]);
  useEffect(() => {
    getData();
  }, [instructor]);
  function getData() {
    setLoading(true);

    InstructorServices.getAllTests(instructor._id)
      .then((data) => {
        console.log(data);
        setTests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };
  const handleOnSelect = (test) => {
    setTests([test]);
  };
  const handleClear = () => {
    setTests([]);
    getData();
  };
  const formatResult = (Instructor) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {Instructor.title}
        </span>
      </>
    );
  };
  const handleSubscription = () => {
    navigation("/instructors/buysubscription", {
      state: { instructor: instructor },
    });
  };
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center md:justify-between m-6">
          <div>
            <div className="">
              <div style={{ width: 300 }}>
                <ReactSearchAutocomplete
                  items={tests}
                  fuseOptions={{ keys: ["title"] }}
                  resultStringKeyName="title"
                  onSelect={handleOnSelect}
                  onClear={handleClear}
                  formatResult={formatResult}
                  onSearch={handleOnSearch}
                  styling={{ zIndex: 4 }}
                  autoFocus
                  placeholder="Search test by title"
                />
              </div>
            </div>
          </div>
          <div className="header_text mt-24">
            <h1 class="w-full items-center mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
              We invest in the world’s potential
            </h1>
            <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Here you will met with the 100% professional Instructors who will
              consults you about everything you To pay for judging your passion
              will give you a lifetime benifit So don't wait for Getting
              subscription!!
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <RiseLoader
            color={"#2237ac"}
            loading={loading}
            css={"margin-top:400px"}
          />
        </div>
        {tests.length === 0 && !loading ? (
          <p>There is test yet!</p>
        ) : (
          <div class="flex bg-gray-100 py-8 px-4 flex-wrap justify-between flex-row">
            {tests.map((test, index) => (
              <TestCard key={index} test={test}></TestCard>
            ))}
          </div>
        )}
        {instructor.fee ? (
          instructor.fee == 0 ? (
            <></>
          ) : (
            <div className="flex justify-center my-10">
              <button
                onClick={handleSubscription}
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >Buy Subscription</button>
            </div>
          )
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default InstructorTestsList;
