import axios from 'axios';
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export const auth = (email, password, isLogin) => {
  return async dispatch => {
    const authData = {email, password, returnSecureToken: true};

    let URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGkRZ7ROix0gxJmOo6PHvF5ZH-G_-LKNo';

    if (isLogin) {
      URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGkRZ7ROix0gxJmOo6PHvF5ZH-G_-LKNo';
    }

    const response = await axios.post(URL, authData);
    const data = response.data;
    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('expirationDate', expirationDate);

    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn));
  }
};

export const autoLogin = () => {
  return dispatch => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout())
    } else {
      const experationDate = new Date(localStorage.getItem('expirationDate'));
      if (experationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token));
        dispatch(autoLogout((experationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
};

export const authSuccess = (token) => {
  return {
    type: AUTH_SUCCESS,
    payload: token
  }
};

export const autoLogout = (time) => {
  return dispatch => setTimeout(() => dispatch(logout()), time * 1000);
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');

  return {
    type: AUTH_LOGOUT
  }
};
