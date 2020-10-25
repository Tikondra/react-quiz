import {CREATE_QUIZ_QUESTION, CREATE_RESET_QUIZ} from "../actions/actionTypes";

const initialState = {
  quiz: []
};

const createReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_QUIZ_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.payload]
      };

    case CREATE_RESET_QUIZ:
      return {
        ...state,
        quiz: []
      };
    default:
      return state
  }
};

export default createReducer;
