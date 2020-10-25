import {CREATE_QUIZ_QUESTION, CREATE_RESET_QUIZ} from "./actionTypes";
import axios from "../../axios/axios-quiz";

export const createQuizQuestion = (item) => {
  return {
    type: CREATE_QUIZ_QUESTION,
    payload: item
  }
};

export const resetQuizCreation = () => {
  return {
    type: CREATE_RESET_QUIZ
  }
};

export const finishCreateQuiz = () => {
  return async (dispatch, getState) => {
    await axios.post('/quizes.json', getState().create.quiz);
    dispatch(resetQuizCreation());
  };
};
