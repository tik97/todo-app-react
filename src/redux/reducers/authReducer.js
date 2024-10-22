import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGOUT,
} from '../actionTypes';

const initialState = {
    accessToken: localStorage.getItem('ACCESS_TOKEN') || null,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case SIGNUP_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
            localStorage.setItem('ACCESS_TOKEN', action.payload);
            return { ...state, loading: false, accessToken: action.payload };
        case LOGIN_FAILURE:
        case SIGNUP_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case LOGOUT:
            localStorage.removeItem('ACCESS_TOKEN');
            return { ...state, accessToken: null };
        default:
            return state;
    }
};

export default authReducer;
