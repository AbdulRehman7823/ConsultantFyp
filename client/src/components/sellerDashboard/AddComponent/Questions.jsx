import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Preview from "./Preview";
import Switch from "@mui/material/Switch";
import FileUploader from "../../FileUploader";
import convertImageToBase64 from "../../ImageBase64";
import { uploadImage } from "../../ImageUpload";
import alert from "../../Services/Alert";
import Select from 'react-select';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Questions( {quiz,setQuiz}) {


  const suggestionOptions = [
    { value: 'computer science', label: 'computer science' },
    { value: 'design', label: 'design' },
    { value: 'architecture', label: 'architecture' },
    { value: 'law', label: 'law' },
    { value: 'animations', label: 'animations' },
    { value: 'architecture', label: 'architecture' },
    { value: 'construction', label: 'construction' },
    { value: 'carpentry', label: 'carpentry' },
    { value: 'laboratory technician', label: 'laboratory technician' },
    { value: 'mechanics', label: 'mechanics' },
  ];
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [questions, setQuestions] = React.useState([]);

  function QuestionForm() {
    const [imgUrl, setImgUrl] = React.useState();
    const [iurl, setIurl] = React.useState("");
    const [data, setData] = React.useState({
      questionText: "",
      questionImage: "",
      questionType: "",
      option1:"",
      option2:"",
      option3:"",
      option4:"",
      suggestions:[],
      score:5,
      answerText: "",
      answerIndex: 3,
    });

    const onDrop = (acceptedFiles, rejectedFiles, imgName) => {
      if (rejectedFiles.length > 0) {
        alert.showWarningAlert("Upload only one image and size limit of 1 MB");
        return;
      } else if (acceptedFiles) {
        convertImageToBase64(acceptedFiles[0], (result, success) => {
          if (success) {
            uploadImage(result, (url, success) => {
              if (success) {
                handleData("questionImage", `${url}`);
                setIurl(`${url}`);
                setImgUrl(acceptedFiles[0].name);
              }
            });
          }
        });
      }
    };

    const [checked, setChecked] = React.useState(true);

    const handleCheck = () => {
      setChecked(!checked);
    };

    function handleData(key, value) {
      if (key === "answerIndex") {
        const obj = { ...data };
        if(value==0)
        obj.answerText = obj.option1;
        else if(value==1)
        obj.answerText = obj.option2;
        else if(value==2)
        obj.answerText = obj.option3;
        else if(value==3)
        obj.answerText = obj.option4;

        setData({ ...obj, [key]: value });
      } else {
        setData({ ...data, [key]: value });
      }
    }

    const handleSave = () => {
      console.log(data)
      if(data.questionText===""
        || data.questionType===""
        || data.option1===""
        || data.option2===""
        || data.option3===""
        || data.option4===""
        || data.answerText===""
        || data.suggestions.length==0
        ){
          alert.showErrorAlert("All details are required");
          return;
        }
      const questionArray = questions;
      questionArray.push(data);
      setQuestions(questionArray);
      const quizObject = {...quiz}
      quizObject.testQuestions = [...questionArray];
      setQuiz(quizObject)
      alert.showSuccessAlert("Question Added Successfully");
    };


    const handleSuggestionsSelect = (selectedOptions)=>{
      var suggestedOptions = [];
      selectedOptions.map(option=>{
        suggestedOptions.push(option.value);
      })
      handleData("suggestions", suggestedOptions);
    }
    return (
      <div>
        <div className="inline-flex justify-center items-center ">
          <h1 className="text-gray-200">Image</h1>
          <Switch
            checked={checked}
            onChange={handleCheck}
            name="gilad"
            color="warning"
          />
          <h1 className="text-gray-200">Text</h1>
        </div>
        <div>
          <label
            for="title"
            className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
          >
            Question
          </label>
          <textarea
            id=""
            onChange={(e) => {
              handleData("questionText", e.target.value);
            }}
            rows="4"
            className="mb-6 block p-2.5 w-full text-m text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your Question here...."
          ></textarea>
        </div>
        {!checked ? (
          <div>
            <label
              for="title"
              className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
            >
              Please Upload Question Image
            </label>
            <div className="flex items-center justify-center ">
              {iurl == "" ? (
                <label
                  for="dropzone-file"
                  className="mb-6 flex flex-col items-center justify-center w-full h-34 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center ">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                  </div>
                  <FileUploader
                    placeholder={imgUrl ? imgUrl : ""}
                    accept={["image/jpeg", "image/png", "image/bmp"]}
                    maxFiles={1}
                    maxSize={1000000}
                    onDrop={(acceptedFiles, rejectedFiles) =>
                      onDrop(acceptedFiles, rejectedFiles, "frontSideImage")
                    }
                  />
                </label>
              ) : (
                <img
                  className=" w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  src={iurl}
                  alt="no image"
                />
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
        <div>
          <label
            for="countries"
            className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
          >
            Select Question Type
          </label>
          <select
            id="Question Type"
            onChange={(e) => {
              handleData("questionType", e.target.value);
            }}
            className=" mb-6 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Select Category</option>
            <option value="Verbal Reasoning">Verbal Reasoning</option>
            <option value="Numerical Reasoning">Career</option>
            <option value="Abstract Reasoning">Abstract Reasoning</option>
            <option value="Mechanical Reasoning">Mechanical Reasoning</option>
            <option value="Spelling">Spelling</option>
            <option value="Language usage">Language usage</option>
            <option value="Clerical speed and accuracy">
              Clerical speed and accuracy
            </option>
            <option value="Space Relation">Space Relation</option>
          </select>
        </div>
        <div>
        <label
            for="countries"
            className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
          >
            Select Question Type
          </label>
          <Select isMulti onChange={handleSuggestionsSelect} options={suggestionOptions} />
        </div>
        <h1 className="text-gray-200 text-xl mb-2">Options</h1>
        <div className="flex flex-wrap flex-row justify-around">
          <input
            type="text"
            onChange={(e) => {
              handleData("option1", e.target.value);
            }}
            id="option1"
            className="mb-6  w-64  mr-4 opacity-xl bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Option 1"
            required
          />
          <input
            type="text"
            onChange={(e) => {
              handleData("option2", e.target.value);
            }}
            id="option2"
            className="mb-6  w-64  mr-4 opacity-xl bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Option 2"
            required
          />
          <input
            type="text"
            onChange={(e) => {
              handleData("option3", e.target.value);
            }}
            id="option3"
            className="mb-6  w-64  mr-4 opacity-xl bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Option 3"
            required
          />
          <input
            type="text"
            onChange={(e) => {
              handleData("option4", e.target.value);
            }}
            id="option4"
            className="mb-6 w-64 mr-4 opacity-xl bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Option 4"
            required
          />
        </div>
        <div>
          <label
            for="Answers"
            className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
          >
            Correct Answer
          </label>
          <select
            id="countries"
            onChange={(e) => {
              handleData("answerIndex", e.target.value);
            }}
            className=" mb-6 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={0}>Option 1</option>
            <option value={1}>Option 2</option>
            <option value={2}>Option 3</option>
            <option value={3}>Option 4</option>
          </select>
        </div>

        <button
          onClick={handleSave}
          className="bg-yellow-500  px-12 py-2 font-xl rounded-md shadow-lg text-gray-100"
        >
          Add Question
        </button>
      </div>
    );
  }

  return (
    <Box className="ml-8" sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          style={{ color: "white" }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="inherit"
          variant="fullWidth"
          indicatorColor="secondary"
        >
          <Tab label="Add Question" {...a11yProps(0)} />
          <Tab label="Preview" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="flex flex-col justify-around  ">
          <h1 className="text-3xl m-6 flex justify-center items-center text-gray-100">
            Question Form
          </h1>
          <div>
            <QuestionForm></QuestionForm>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Preview questions={questions}></Preview>
      </TabPanel>
    </Box>
  );
}

export default Questions;
