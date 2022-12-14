import React from "react";
import FileUploader from "../../FileUploader";
import convertImageToBase64 from "../../ImageBase64";
import { uploadImage } from "../../ImageUpload";
import { useNavigate } from "react-router-dom";
import alert from "../../Services/Alert";
import InstructorServices from "../../Services/InstructorServices";
import authServices from "../../Services/AuthServices";
import Questions from "./Questions";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import "./style.css";

function AddComponent() {
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = React.useState();
  const [iurl, setIurl] = React.useState("");
  const [data, setData] = React.useState({
    instructorId: authServices.getLoggedInUser()._id,
    title: "",
    description: "",
    img: "",
    testQuestions:[]
  });
  function handleData(key, value) {
    setData({ ...data, [key]: value });
  }
  const handleSave  = (e) => {
    e.preventDefault();
    if (!data.img) {
      alert.showErrorAlert("Please upload image");
      return;
    }
    if (data.title === "" || data.description === "") {
      alert.showErrorAlert("please give all details");
      return;
    }

    if(data.testQuestions.length==0){
      alert.showErrorAlert("Your Quiz Should have atleast one Question");
      return;
    }
    handleData("instructorId", authServices.getLoggedInUser()._id);
    InstructorServices
      .addTest(data)
      .then((res) => {
        alert.showSuccessAlert("Test Added Successfully");
        navigate("/app/seller/home");
      })
      .catch((err) => {
        alert.showErrorAlert(err.response.data.message);
        console.log(err.response.data.message);
      });
  };

  const onDrop = (acceptedFiles, rejectedFiles, imgName) => {
    if (rejectedFiles.length > 0) {
      alert.showWarningAlert("Upload only one image and size limit of 1 MB");
      return;
    } else if (acceptedFiles) {
      convertImageToBase64(acceptedFiles[0], (result, success) => {
        if (success) {
          uploadImage(result, (url, success) => {
            if (success) {
              handleData("img", `${url}`);
              setIurl(`${url}`);
              setImgUrl(acceptedFiles[0].name);
            }
          });
        }
      });
    }
  };
  
  const [hide, setHide] = React.useState(false);

  return (
    <div className="pl-1  h-screen justify-center">
      <div className="relative flex flex-row bg-gray-800 justify-around shadow-xl rounded-xl mt-4 p-10">
        <button
          onClick={() => {
            setHide(!hide);
          }}
          className="absolute top-2 left-2"
        >
          {!hide ? (
            <BsEyeFill className="text-2xl text-gray-200" />
          ) : (
            <BsEyeSlashFill className="text-2xl text-yellow-400" />
          )}
        </button>
        {hide ? (
          <div className="addPanel w-2/3 pr-2 ">
            <h1 className="flex w-full text-3xl m-4 font-lg text-gray-100 font-bold justify-center">
              ADD Test
            </h1>

            <div>
              <label
                for="title"
                className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Test Title
              </label>
              <input
                type="text"
                onChange={(e) => {
                  handleData("title", e.target.value);
                }}
                id="title"
                className="mb-6 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Title"
                required
              />
            </div>
           

            <div>
              <label
                for="detaile"
                className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
              >
                Test Description
              </label>
              <textarea
                id=""
                onChange={(e) => {
                  handleData("description", e.target.value);
                }}
                rows="4"
                className="mb-6 block p-2.5 w-full text-m text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write about your Test here...."
              ></textarea>
            </div>
            <div className="flex items-center justify-center ">
              {iurl == "" ? (
                <label
                  for="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
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
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <FileUploader
                    placeholder={imgUrl ? imgUrl : "Click here to upload"}
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
            <button
              onClick={handleSave}
              className="bg-yellow-500 mt-6 w-full px-12 py-2 font-xl rounded-md shadow-lg text-gray-100"
            >
              Add Question
            </button>
          </div>
        ) : (
          <></>
        )}
        <Questions quiz={data} setQuiz={setData}></Questions>
      </div>
    </div>
  );
}

export default AddComponent;
