import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGOUT
} from '../actionTypes';

const API_URL = process.env.REACT_APP_API_URL;

export const loginSuccess = (token) => ({
    type: LOGIN_SUCCESS,
    payload: token,
});

export const login = (credentials) => async dispatch => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const response = await axios.post(`${API_URL}/api/InternalLogin`, credentials);
        const { accessToken } = response.data;

        localStorage.setItem('ACCESS_TOKEN', accessToken);

        dispatch({ type: LOGIN_SUCCESS, payload: accessToken });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
};

export const signup = (userData) => async dispatch => {
    dispatch({ type: SIGNUP_REQUEST });
    try {
        const response = await axios.post(`${API_URL}/api/InternalLogin/sign-up`, userData);
        const { userId } = response.data;

        localStorage.setItem('USER_ID', userId);

        dispatch({ type: SIGNUP_SUCCESS, payload: { userId } });
    } catch (error) {
        dispatch({ type: SIGNUP_FAILURE, payload: error.message });
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('USER_ID');

    dispatch({ type: LOGOUT });
};
