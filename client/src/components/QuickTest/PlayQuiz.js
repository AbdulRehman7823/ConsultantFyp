import { useState, useEffect } from "react";
import axios from "axios";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { toast } from "react-toastify";

export default function PlayQuiz() {
  const [questions, setQuestions] = useState([]);
  const [handelText, setHandelText] = useState("");
  const [handelEmail, setHandelEmail] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [isNext, setisNext] = useState(false);
 const [repeat,setRepeat] = useState(0);
  async function getQuestionsData() {
    try {
       const result = [
        {
            questionText: "Find the correctly spelt word.",
            questionImage: "",
            questionType: "Spelling",
            option1:"Vetarinary",
            option2:"Veteninary",
            option3:"Vetinary",
            option4:"Veterinary",
            suggestions:["Bussiness executive","Reviewers","Script Writers","Authors","Proof Readers","Media Editors","Public Relations","Civil Service"],
            score:5,
            answerText: "Veterinary",
            answerIndex: 3,
        },
        {
            questionText: "Find the correctly spelt word.",
            questionImage: "",
            questionType: "Spelling",
            option1:"Humorous",
            option2:"saumorous",
            option3:"fmorous",
            suggestions:["Bussiness executive","Reviewers","Script Writers","Authors","Proof Readers","Media Editors","Public Relations","Civil Service"],
            option4:"sfumorous",
            score:2,
            answerText: "Humorous",
            answerIndex: 0,
        },
        {
            questionText: "Find the correctly spelt word.",
            questionImage: "",
            questionType: "Spelling",
            suggestions:["",""],
            option1:"Aeroddrome",
            option2:"Aerodrome",
            option3:"Aerodrom",
            option4:"Aerodroe",
            suggestions:["Bussiness executive","Reviewers","Script Writers","Authors","Proof Readers","Media Editors","Public Relations","Civil Service"],

            score:10,
            answerText: "Aerodrome",
            answerIndex: 1,
        },
        
       ]
      setQuestions(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (questions.length == 0) {
      getQuestionsData();
    }
  });

  const savePoints = () => {
    if (!handelText || !handelEmail) {
      toast.error("Please enter your details!!!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {

     /* axios
        .post(STRAPI_URL + `/api/leader-boards`, {
          data: {
            user_name: handelText,
            user_email: handelEmail,
            points: score,
          },
        })
        .then(
          (response) => {
            toast.success("Score saved successfully", {
              position: toast.POSITION.TOP_CENTER,
            });
            console.log(response.data);
          },
          (error) => {
            console.log(error);
          }
        );*/
    }
  };

  const handleAnswerOption = (answer) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
    console.log(selectedOptions);
  };

  const handlePrevious = () => {
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };

  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues);
    setisNext(true);
    setRepeat(30)
  };

  const handleSubmitButton = () => {
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {

      questions[i].answerText === selectedOptions[i]?.answerByUser &&
        (newScore +=    questions[i].score);
    }
    setScore(newScore);
    setShowScore(true);
  };

  return (
    <div className="py-28 flex flex-col px-5 bg-gray-900 justify-center items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        {showScore ? (
          <div className="flex flex-col px-5 bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
              <div className="mt-2 p-3">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src="https://t4.ftcdn.net/jpg/01/84/79/49/240_F_184794995_tRSaZ9Y8snW0xndL8KFn28IbPbIeDc7x.jpg"
                  alt="blog"
                />
                <h1 className="flex justify-center font-bold text-xl mb-5 text-green-500  mt-3">
                  You scored {score} out of {questions.length}
                </h1>
            
              </div>
              <div
                className="text-white bg-yellow-400 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg text-center justify-center cursor-pointer flex mt-2 mx-auto"
                onClick={(e) => savePoints()}
              >
                Save
              </div>
              <div
                className="text-white bg-yellow-400 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg text-center justify-center cursor-pointer flex mt-2 mx-auto"
                onClick={(e) => {
                  setShowScore(false);
                  setScore(0);
                  setCurrentQuestion(0);
                  setSelectedOptions([]);
                }}
              >
                Again?
              </div>

                <div className="text-white bg-yellow-400 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg text-center justify-center cursor-pointer flex mt-2 mx-auto">
                  Home
                </div>
            </div>
          </div>
        ) : questions.length > 1 ? (
          <>
            <div className="flex flex-col items-start w-full h-full">
              <div className="flex flex-row space-x-20 md:space-x-80">
                <h4 className="mt-10 text-md  text-gray-100">
                  Question {currentQuestion + 1} of {questions.length}
                </h4>
                <div className="text-gray-200 mt-8">
                  <CountdownCircleTimer
                    isPlaying
                    size={60}
                    duration={30}
                    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[7, 5, 2, 0]}
                    onComplete={() => {
                      currentQuestion + 1 === questions.length
                        ? handleSubmitButton()
                        : handleNext();
                      return { shouldRepeat: true, delay: 0.5 };
                    }}
                  >
                    {({ remainingTime }) => remainingTime}
                  </CountdownCircleTimer>
                </div>
              </div>
              <div className="mt-4 text-2xl text-gray-200">
                {questions[currentQuestion].questionText}
              </div>

              {questions[currentQuestion].questionImage !== "" ? (
                <div>
                  <img
                    className="md:h-[250px] md:w-[550px] w-full object-cover object-center mt-5"
                    src={
                      questions[currentQuestion].questionImage
                    }
                    alt="blog"
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-col md:flex-row w-full mt-5">
              <div className="w-full">
                <div
                  className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white rounded-xl bg-red-600"
                  onClick={(e) =>
                    handleAnswerOption(
                      questions[currentQuestion].option1
                    )
                  }
                >
                  <input
                    type="radio"
                    name={questions[currentQuestion].option1}
                    value={questions[currentQuestion].option1}
                    checked={
                      questions[currentQuestion].option1 ===
                      selectedOptions[currentQuestion]?.answerByUser
                    }
                    onChange={(e) =>
                      handleAnswerOption(
                        questions[currentQuestion].option1
                      )
                    }
                    className="w-6 h-6 bg-white"
                  />
                  <p className="ml-6 text-white">
                    {questions[currentQuestion].option1}
                  </p>
                </div>
                <div
                  className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white rounded-xl bg-blue-600"
                  onClick={(e) =>
                    handleAnswerOption(
                      questions[currentQuestion].option2
                    )
                  }
                >
                  <input
                    type="radio"
                    name={questions[currentQuestion].option2}
                    value={questions[currentQuestion].option2}
                    checked={
                      questions[currentQuestion].option2 ===
                      selectedOptions[currentQuestion]?.answerByUser
                    }
                    onChange={(e) =>
                      handleAnswerOption(
                        questions[currentQuestion].option2
                      )
                    }
                    className="w-6 h-6 bg-white"
                  />
                  <p className="ml-6 text-white">
                    {questions[currentQuestion].option2}
                  </p>
                </div>
              </div>
              <div className="w-full">
                <div
                  className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white rounded-xl bg-yellow-400"
                  onClick={(e) =>
                    handleAnswerOption(
                      questions[currentQuestion].option3
                    )
                  }
                >
                  <input
                    type="radio"
                    name={questions[currentQuestion].option3}
                    value={questions[currentQuestion].option3}
                    checked={
                      questions[currentQuestion].option3 ===
                      selectedOptions[currentQuestion]?.answerByUser
                    }
                    onChange={(e) =>
                      handleAnswerOption(
                        questions[currentQuestion].option3
                      )
                    }
                    className="w-6 h-6 bg-white"
                  />
                  <p className="ml-6 text-white">
                    {questions[currentQuestion].option3}
                  </p>
                </div>
                <div
                  className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white rounded-xl bg-green-600"
                  onClick={(e) =>
                    handleAnswerOption(
                      questions[currentQuestion].option4
                    )
                  }
                >
                  <input
                    type="radio"
                    name={questions[currentQuestion].option4}
                    value={questions[currentQuestion].option4}
                    checked={
                      questions[currentQuestion].option4 ===
                      selectedOptions[currentQuestion]?.answerByUser
                    }
                    onChange={(e) =>
                      handleAnswerOption(
                        questions[currentQuestion].option4
                      )
                    }
                    className="w-6 h-6 bg-white"
                  />
                  <p className="ml-6 text-white">
                    {questions[currentQuestion].option4}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <button
                onClick={
                  currentQuestion + 1 === questions.length
                    ? handleSubmitButton
                    : handleNext
                }
                className="w-[49%] py-3 bg-green-500 rounded-lg"
              >
                {currentQuestion + 1 === questions.length ? "Submit" : "Next"}
              </button>
            </div>
            {/* <div className="flex justify-between w-full mt-4 text-white">
              <button
                onClick={handlePrevious}
                className="w-[49%] py-3 bg-green-500 rounded-lg"
              >
                Previous
              </button>
            </div> */}
          </>
        ) : (
          <>
            <div role="status" className="p-20 mt-20">
              <svg
                className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
