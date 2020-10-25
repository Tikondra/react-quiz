import React from "react";
import classes from './AnswersList.module.scss';
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = ({answers, state, onAnswersClick}) => {
  return (
    <ul className={classes.AnswersList}>
      { answers.map((answer, i) => {
        return (
          <AnswerItem
            key={i}
            state={state ? state[answer.id] : null}
            answer={answer}
            onAnswerClick={onAnswersClick}
          />
        )
      })}
    </ul>
  )
};

export default AnswersList;
