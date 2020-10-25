import axios from "../../axios/axios-quiz";
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION,
  QUIZ_SET_STATE, QUIZ_RETRY
} from "./actionTypes";

export const fetchQuizes = () => {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get('/quizes.json');
      const quizes = [];
      Object.keys(response.data).forEach((key, i) => {
        quizes.push({
          id: key,
          name: `Тест № ${i + 1}`
        })
      });
      dispatch(fetchQuizesSuccess(quizes))
    } catch (e) {
      console.log(e);
      dispatch(fetchQuizesError())
    }
  }
};

export const fetchQuizById = (quizId) => {
  return async dispatch => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get(`/quizes/${quizId}.json`);
      const quiz = response.data;
      dispatch(fetchQuizSuccess(quiz))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
};

export const fetchQuizSuccess = (quiz) => {
  return {
    type: FETCH_QUIZ_SUCCESS,
    payload: quiz
  }
};

export const fetchQuizesStart = () => {
  return {
    type: FETCH_QUIZES_START
  }
};

export const fetchQuizesSuccess = (quizes) => {
  return {
    type: FETCH_QUIZES_SUCCESS,
    payload: quizes
  }
};

export const fetchQuizesError = (e) => {
  return {
    type: FETCH_QUIZES_ERROR,
    payload: e
  }
};

export const quizSetState = (answerState, results) => {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  }
};

export const finishQuiz = () => {
  return {
    type: FINISH_QUIZ,
  }
};

export const quizNextQuestion = (number) => {
  return {
    type: QUIZ_NEXT_QUESTION,
    payload: number
  }
};

export const quizAnswerClick = (answerId) => {
  return (dispatch, getState) => {
    const state = getState().quiz;

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === 'success') {
        return
      }
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      dispatch(quizSetState({[answerId]: 'success'}, results));

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz())
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = 'error';
      dispatch(quizSetState({[answerId]: 'error'}, results));
    }
  }
};

export const retryQuiz = () => {
  return {
    type: QUIZ_RETRY
  }
};

const isQuizFinished = (state) => state.activeQuestion + 1 === state.quiz.length;
