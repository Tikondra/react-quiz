import React from "react";
import AnswersList from "./AnswersList/AnswersList";
import classes from './ActiveQuiz.module.scss';

const ActiveQuiz = ({question, answers, quizLength, answerNumber, state, onAnswerClick}) => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>{answerNumber}. </strong>
          {question}
        </span>
        <small>{answerNumber} из {quizLength}</small>
      </p>
      <AnswersList
        state={state}
        answers={answers}
        onAnswersClick={onAnswerClick}
      />
    </div>
  )
};

export default ActiveQuiz;
