import React, { Component } from "react";
import Question from "./Questions/Question";
import QuestionNavigator from "./QuestionNavigator/QuestionNavigator";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";

import "./App.css";

class App extends Component {
  state = {
    questionIndex: 0,
    selectedAnswers: {},
    questionsVisited: [0],
    correctOptionIdx: {},
    questions: null,
    showAnswerMode: false,
    isLoading: true,
    drawerVisisble: false,
  };

  constructor(props) {
    super(props);

    for (let i = 0; i < 10; ++i) {
      const crtOption = Math.floor(Math.random() * 4);
      this.state.correctOptionIdx[i] = crtOption;
    }
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = () => {
    this.setState({
      isLoading: true,
    });
    axios
      .get("https://opentdb.com/api.php?amount=10&&type=multiple")
      .then((data) => {
        if (data.status !== 200) {
          return;
        }

        const { response_code, results } = data.data;
        if (response_code !== 0) return;

        this.setState({
          questions: results,
          isLoading: false,
        });
      });
  };

  changeQuestion = (newQuestionIndex) => {
    let newQuestionVisited = null;
    if (this.state.questionsVisited.indexOf(newQuestionIndex) !== -1) {
      newQuestionVisited = [...this.state.questionsVisited];
    } else {
      newQuestionVisited = [...this.state.questionsVisited, newQuestionIndex];
    }

    this.setState({
      questionIndex: newQuestionIndex,
      questionsVisited: newQuestionVisited,
    });
  };

  nextHandler = () => {
    this.changeQuestion(this.state.questionIndex + 1);
  };

  prevHandler = () => {
    this.changeQuestion(this.state.questionIndex - 1);
  };

  onOptionSelected = (newOption) => {
    let newSelectedAnswers = { ...this.state.selectedAnswers };

    if (newSelectedAnswers[this.state.questionIndex] === newOption) {
      newSelectedAnswers[this.state.questionIndex] = null;
    } else {
      newSelectedAnswers[this.state.questionIndex] = newOption;
    }

    this.setState({
      selectedAnswers: newSelectedAnswers,
    });
  };

  onSubmit = () => {
    if (this.state.showAnswerMode) {
      let crtOptions = {};
      for (let i = 0; i < 10; ++i) {
        const crtOption = Math.floor(Math.random() * 4);
        crtOptions[i] = crtOption;
      }
      this.setState({
        showAnswerMode: false,
        questionIndex: 0,
        selectedAnswers: {},
        questionsVisited: [0],
        correctOptionIdx: crtOptions,
        isLoading: true,
      });

      this.fetchQuestions();
    } else {
      if (!window.confirm("Are you sure want to submit?")) return;
      this.setState({ showAnswerMode: true });
    }
  };

  showDrawer = () => {
    this.setState({ drawerVisisble: !this.state.drawerVisisble });
  };

  render() {
    if (this.state.isLoading) {
      return <LoadingSpinner></LoadingSpinner>;
    }
    return (
      <div className="app-container">
        {this.state.drawerVisisble ? (
          <div className="app-backdrop" onClick={this.showDrawer}></div>
        ) : null}

        <button
          className={`app-action-button drawer-button ${
            this.state.drawerVisisble ? "drawer-button--visisble" : ""
          }`}
          onClick={this.showDrawer}
        >
          |||
        </button>

        <div className="app-question-panel">
          <h1 className="app-header">QUIZILLLLLA!</h1>

          <div className="app-question-container">
            <Question
              question={this.state.questions[this.state.questionIndex]}
              selectedAnswer={
                this.state.selectedAnswers[this.state.questionIndex]
              }
              onOptionSelected={this.onOptionSelected}
              showAnswerMode={this.state.showAnswerMode}
              correctOption={
                this.state.correctOptionIdx[this.state.questionIndex]
              }
            />
          </div>
          <div className="app-question-actions">
            <button
              className="app-action-button"
              onClick={this.prevHandler}
              disabled={this.state.questionIndex <= 0}
            >
              Previous Question
            </button>
            <button
              className="app-action-button"
              onClick={this.nextHandler}
              disabled={this.state.questionIndex >= 9}
            >
              Next Question
            </button>
          </div>
        </div>
        <QuestionNavigator
          questionCount={10}
          questionsVisited={this.state.questionsVisited}
          selectedAnswers={this.state.selectedAnswers}
          questionIndex={this.state.questionIndex}
          questions={this.state.questions}
          showAnswerMode={this.state.showAnswerMode}
          drawerVisisble={this.state.drawerVisisble}
          onChangeQuestion={this.changeQuestion}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

export default App;
