import React, { useState } from "react";
import adminService from "../../Services/AdminServices";
import RiseLoader from "react-spinners/RiseLoader";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import TestCard from "./TestCard";

const TestList = () => {
  const [loading, setLoading] = React.useState(false);

  const [tests, settests] = React.useState([]);
  function getData() {
    setLoading(true);

    adminService
      .getTests()
      .then((data) => {
        console.log(data);
        settests(data);
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
    settests([test]);
  };
  const handleClear = () => {
    settests([]);
    getData();
  };
  const formatResult = (test) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {test.title}
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
                  placeholder="Search poetry by title"
                />
              </div>
            </div>
          </div>
          <div className="header_text mt-24">
            <h1 class="w-full items-center mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              These are the Following Tests
            </h1>
         
          </div>
        </div>
        <div className="flexjustify-center">
          <RiseLoader
            color={"#2237ac"}
            loading={loading}
            css={"margin-top:400px"}
          />
        </div>
        {tests.length === 0 && !loading ? (
          <p>There is no Tests yet!</p>
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
