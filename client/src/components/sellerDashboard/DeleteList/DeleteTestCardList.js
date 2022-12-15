import React from 'react'
import authServices from '../../Services/AuthServices';
import instructorServices from '../../Services/InstructorServices';
import TestCard from './DeleteTestCard'
import { ReactSearchAutocomplete } from "react-search-autocomplete";


function DeleteTestCardList() {
  const [tests,setTests] = React.useState([]);


const getAllTests = () =>{
  instructorServices.getAllTests(authServices.getLoggedInUser()._id).then(data =>{
    setTests(data);
  })
}

const handleOnSearch = (string, results) => {
  console.log(string, results);
};
const handleOnSelect = (test) => {
  setTests([test]);
};
const handleClear = () => {
  setTests([]);
  getAllTests();
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

React.useEffect(getAllTests,[])
  return (
    <div className="flex flex-row flex-wrap justify-between">
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
         {tests.map((data,index)=>{
           return <TestCard poetry={data} key={index}/>
         })}
       
    </div>
  )
}

export default DeleteTestCardList