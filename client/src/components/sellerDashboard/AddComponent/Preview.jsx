import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function Preview({ questions }) {
  return (
    <div>
  
      {questions.map((ques, i) => {
        return (
          <div
            key={i}
            className="bg-gray-100 w-full p-4 flex flex-col justify-center rounded-xl shadow-lg m-2"
          >
            {ques.questionImage !== "" ? (
              <div>
                <img
                  className=" object-none h-48 w-96 w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  src={ques.questionImage}
                  alt="no image"
                />
              </div>
            ) : (
              <></>
            )}
            <h1 className="text-gray-700 text-2xl py-4">
              {i + 1}.{ques.questionText}
            </h1>

            <h2 className="text-md w-1/4 font-bold text-gray-100 bg-yellow-300 shadow-xl rounded-lg p-2">
              {ques.questionType}
            </h2>
            <div className="">
              <h2 className="text-xl my-4"></h2>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Options
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                        value={ques.option1.optionText}
                        control={<Radio />}
                        label={ques.option1.optionText}
                      />
                       <FormControlLabel
                        value={ques.option2.optionText}
                        control={<Radio />}
                        label={ques.option2.optionText}
                      />
                       <FormControlLabel
                        value={ques.option3.optionText}
                        control={<Radio />}
                        label={ques.option3.optionText}
                      />
                       <FormControlLabel
                        value={ques.option4.optionText}
                        control={<Radio />}
                        label={ques.option4.optionText}
                      />
                </RadioGroup>
              </FormControl>
            </div>
            <hr></hr>
            <h2 className="text-md w-1/4  text-gray-100 bg-green-700 shadow-xl rounded-lg p-1">
              {ques.answerText}
            </h2>
          </div>
        );
      })}
    </div>
  );
}

export default Preview;
