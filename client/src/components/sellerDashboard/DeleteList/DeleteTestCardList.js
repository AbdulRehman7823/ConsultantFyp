import React from 'react'
import authServices from '../../Services/AuthServices';
import instructorServices from '../../Services/InstructorServices';
import TestCard from './DeleteTestCard'


function DeleteTestCardList() {
  const [poetries,setPoetries] = React.useState([]);


const getAllTests = () =>{
  instructorServices.getAllTests(authServices.getLoggedInUser()._id).then(data =>{
    setPoetries(data);
  })
}

React.useEffect(getAllTests,[])
  return (
    <div className="flex flex-row flex-wrap justify-between">

         {poetries.map((data,index)=>{
           return <TestCard poetry={data} key={index}/>
         })}
       
    </div>
  )
}

export default DeleteTestCardList