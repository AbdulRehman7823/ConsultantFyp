import React from "react";
import candidateServices from "../Services/CandidateServices";
import HashLoader from "react-spinners/HashLoader";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import InstructorCard from "./InstructorCard";
import "./style.css";
const InstructorCardList = () => {
  const [loading, setLoading] = React.useState(false);
  const [instructor, setInstructor] = React.useState([]);
  function getData() {
    setLoading(true);
    candidateServices
      .getInstructors()
      .then((data) => {
        console.log(data);
        setInstructor(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };
  const handleOnSelect = (instructor) => {
    setInstructor([instructor]);
  };
  const handleClear = () => {
    setInstructor([]);
    getData();
  };
  const formatResult = (instructor) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {instructor.username}
        </span>
      </>
    );
  };
  React.useEffect(getData, []);
  return (
    <section class="text-gray-100 bg-gray-900 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center md:justify-between m-6">
          <div>
            <div className="">
              <div style={{ width: 300 }}>
                <ReactSearchAutocomplete
                  items={instructor}
                  fuseOptions={{ keys: ["username"] }}
                  resultStringKeyName="username"
                  onSelect={handleOnSelect}
                  onClear={handleClear}
                  formatResult={formatResult}
                  onSearch={handleOnSearch}
                  styling={{ zIndex: 4 }}
                  autoFocus
                  placeholder="Search Instructor"
                />
              </div>
            </div>
          </div>
          <div className="header_text mt-24">
            <h1 class="w-full items-center mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
            We invest in the world’s potential
            </h1>
            <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Here you will met with the 100% professional Instructors who will consults you about everything you
              To pay for judging your passion will give you a lifetime benifit
              So don't wait for Getting subscription!!
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <HashLoader
            color={"#2237ac"}
            loading={loading}
            size={150}
            css={"margin-top:400px"}
          />
        </div>
        {instructor.length === 0 && !loading ? (
          <p>There is no Instructor yet!</p>
        ) : (
          <div class="flex flex-wrap -m-4">
            {instructor.map((instructor) => (
              <div class="xl:w-1/4 md:w-1/2 w-full p-4">
                <InstructorCard instructor={instructor}></InstructorCard>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default InstructorCardList;
