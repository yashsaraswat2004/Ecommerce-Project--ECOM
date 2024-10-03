import axios from "axios"
import { api, API_BASE_URL } from "../../config/Api"
import { GET_ALL_USER_FAILURE, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
const token = localStorage.getItem("jwt");

//<<----------------- REGISTER -------------->>
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user })
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error })
export const registerUser = (userData) => async (dispatch) => {
    dispatch(registerRequest())

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData)
        const user = response.data;
        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt)
        }
        console.log("register user", user);
        dispatch(registerSuccess(user.jwt))
    } catch (error) {
        dispatch(registerFailure(error.message))
    }
}

//<<----------------- LOGIN -------------->>
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user })
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error })
export const loginUser = (userData) => async (dispatch) => {
    dispatch(loginRequest())

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
        const { jwt, user } = response.data;  // Assuming API returns both user info and JWT
        if (jwt) {
            localStorage.setItem('jwt', jwt);  // Save JWT to localStorage
        }

        dispatch({
            type: LOGIN_SUCCESS,
            payload: { jwt, user },  // Store both in Redux
        });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
};


// ------------------ GET ALL USER --------------->>
const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user })
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error })
export const getUser = (jwt) => async (dispatch) => {
    dispatch(getUserRequest())

    try {
        const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        const user = response.data;
        console.log("user profile", user);
        dispatch(getUserSuccess(user))
    } catch (error) {
        dispatch(getUserFailure(error.message))
    }
}

export const getAllUserData = () => async (dispatch) => {
    dispatch({ type: GET_ALL_USER_REQUEST });  // Correct action type for fetching all users
    try {
        const { data } = await api.get('/api/users/');  // Ensure the correct API endpoint
        dispatch({ type: GET_ALL_USER_SUCCESS, payload: data });  // Dispatch success with data
        console.log("all users", data);
    } catch (error) {
        dispatch({ type: GET_ALL_USER_FAILURE, payload: error.message });  // Handle failure
    }
};


// ------------------- LOGOUT --------------------->>
export const logOut = () => (dispatch) => {
    dispatch({ type: LOGOUT, payload: null })
    localStorage.clear();
}