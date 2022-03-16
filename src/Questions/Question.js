import React from "react";
import "./Question.css";

const Question = (props) => {
  const q = props.question;
  /**
   * Question has following properties:
   * category, difficulty, question, incorrect_answers(it's a list), correct_answer
   */

  const options = [...q.incorrect_answers, q.correct_answer];
  let correctOpt = props.correctOption;

  const tmp1 = options[correctOpt];
  options[correctOpt] = options[3];
  options[3] = tmp1;

  const difficulty = q.difficulty.toLowerCase();

  let tagClass = "app-question__tag";
  if (difficulty === "easy") {
    tagClass += " app-question__tag--easy";
  }
  if (difficulty === "medium") {
    tagClass += " app-question__tag--medium";
  }
  if (difficulty === "hard") {
    tagClass += " app-question__tag--hard";
  }

  const selectedAnswer = props.selectedAnswer;
  const showAnswerMode = props.showAnswerMode;

  const handleOptionClick = (opt) => {
    if (!showAnswerMode) props.onOptionSelected(opt);
  };

  return (
    <div className="app-question">
      <div
        className="app-question__statement"
        dangerouslySetInnerHTML={{ __html: q.question }}
      ></div>

      <div className="app-question__options">
        {options.map((opt) => {
          let clsName = "app-question__option";
          if (showAnswerMode) {
            if (opt === q.correct_answer) {
              clsName += " app-question__option--correct";
            } else if (selectedAnswer === opt) {
              clsName += " app-question__option--incorrect";
            }
          } else if (selectedAnswer === opt) {
            clsName += " app-question__option--selected";
          }

          return (
            <div
              className={clsName}
              onClick={() => handleOptionClick(opt)}
              dangerouslySetInnerHTML={{ __html: opt }}
              key={opt}
            ></div>
          );
        })}
      </div>

      <div className={tagClass}>{difficulty}</div>
    </div>
  );
};

export default Question;
