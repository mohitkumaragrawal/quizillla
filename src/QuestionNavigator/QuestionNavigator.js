import React from "react";
import "./QuestionNavigator.css";

const questionNavigator = (props) => {
  const {
    questionCount,
    questionsVisited,
    selectedAnswers,
    questionIndex,
    onChangeQuestion,
    showAnswerMode,
    questions,
    drawerVisisble,
  } = props;
  const questionButtons = [];

  for (let i = 1; i <= questionCount; ++i) {
    const qIdx = i - 1;
    const qVisited = questionsVisited.indexOf(qIdx) !== -1;
    const qAnswered =
      selectedAnswers[qIdx] !== undefined && selectedAnswers[qIdx] !== null;

    const qSelected = questionIndex === qIdx;

    let clsName = "app-question-navigator__button";

    if (qSelected) {
      clsName += " app-question-navigator__button--selected";
    }

    if (showAnswerMode && qAnswered) {
      const isCorrect =
        selectedAnswers[qIdx] === questions[qIdx].correct_answer;
      clsName += isCorrect
        ? " app-question-navigator__button--answered"
        : " app-question-navigator__button--incorrect";
    } else {
      if (qAnswered) {
        clsName += " app-question-navigator__button--answered";
      } else if (qVisited) {
        clsName += " app-question-navigator__button--visited";
      }
    }

    questionButtons.push(
      <div
        onClick={() => onChangeQuestion(qIdx)}
        className={clsName}
        key={qIdx}
      >
        {i}
      </div>
    );
  }

  const calculateScore = () => {
    let total = 0;
    let scored = 0;

    for (let i = 0; i < 10; ++i) {
      const quest = questions[i];
      let fm = 0;

      switch (quest.difficulty) {
        case "easy":
          fm = 1;
          break;
        case "medium":
          fm = 2;
          break;
        case "hard":
          fm = 4;
          break;
        default:
          fm = 0;
      }

      if (quest.correct_answer === selectedAnswers[i]) {
        scored += fm;
      }
      total += fm;
    }

    return `Score: ${scored}/${total}`;
  };

  let navigatorClass = "app-question-navigator";
  if (drawerVisisble) {
    navigatorClass += " app-question-navigator--visible";
  }
  return (
    <div className={navigatorClass}>
      <div className="app-question-navigator__buttons">{questionButtons}</div>
      {showAnswerMode ? (
        <div className="app-question-navigator__score">{calculateScore()}</div>
      ) : null}
      <button className="app-action-button" onClick={props.onSubmit}>
        {showAnswerMode ? "Reset" : "Submit"}
      </button>
    </div>
  );
};

export default questionNavigator;
