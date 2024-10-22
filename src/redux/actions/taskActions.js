import axios from 'axios';
import {
    FETCH_TASKS,
    FETCH_TASKS_SUCCESS,
    TASKS_ERROR,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK,
} from '../actionTypes';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchTasks = () => async (dispatch, getState) => {
    const { accessToken } = getState().auth;
    dispatch({ type: FETCH_TASKS });

    try {
        const response = await axios.get(`${API_URL}/api/Todos`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch({ type: FETCH_TASKS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: TASKS_ERROR, payload: error.message });
    }
};

export const addTask = (task) => async (dispatch, getState) => {
    const { accessToken } = getState().auth;

    try {
        const response = await axios.post(`${API_URL}/api/Todos`, task, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch({ type: ADD_TASK, payload: response.data });
        return response
    } catch (error) {
        dispatch({ type: TASKS_ERROR, payload: error.message });
    }
};

export const updateTask = (task) => async (dispatch, getState) => {
    const { accessToken } = getState().auth;

    try {
        const response = await axios.put(`${API_URL}/api/Todos/${task.id}`, task, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch({ type: UPDATE_TASK, payload: response.data });
    } catch (error) {
        dispatch({ type: TASKS_ERROR, payload: error.message });
    }
};

export const deleteTask = (taskId) => async (dispatch, getState) => {
    const { accessToken } = getState().auth;

    try {
        await axios.delete(`${API_URL}/api/Todos/${taskId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        dispatch({ type: DELETE_TASK, payload: taskId });
    } catch (error) {
        dispatch({ type: TASKS_ERROR, payload: error.message });
    }
};
