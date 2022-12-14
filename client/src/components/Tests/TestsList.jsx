import React, { useState } from "react";
import candidateServices from "../Services/CandidateServices";
import HashLoader from "react-spinners/HashLoader";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import TestCard from "./TestCard";

const TestList = () => {
  const [loading, setLoading] = React.useState(false);

  const [tests, setTests] = React.useState([]);
  function getData() {
    setLoading(true);

    candidateServices.getQuizes()
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
  const formatResult = (Test) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {Test.title}
        </span>
      </>
    );
  };

  React.useEffect(getData, []);
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
            <h1 class="w-full items-center mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Tests of the new Generation
            </h1>
            <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Here you will met with the 100% professional Instructors who will consults you about everything you
              To pay for judging your passion will give you a lifetime benifit
              So don't wait for Getting subscription!!
            </p>
          </div>
        </div>
        <div className="flexjustify-center">
          <HashLoader
            color={"#2237ac"}
            loading={loading}
            css={"margin-top:400px"}
          />
        </div>
        {tests.length === 0 && !loading ? (
          <p>There is no test yet!</p>
        ) : (
          <div class="flex py-6 rounded-xl bg-gray-100 flex-wrap justify-between flex-row">
            {tests.map((test, index) => (
              
                <TestCard key={index} test={test}></TestCard>
            
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestList;
