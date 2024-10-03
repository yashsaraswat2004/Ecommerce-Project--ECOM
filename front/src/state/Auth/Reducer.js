import { GET_ALL_USER_FAILURE, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";

const initialState = {
    user: null,
    users: [],  // For storing multiple users
    isLoading: false,
    error: null,
    jwt: null,
    isLoggedIn: false,  // To track login status
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case GET_ALL_USER_REQUEST:  // Add handler for getting all users
            return { ...state, isLoading: true, error: null };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                jwt: action.payload.jwt,
                user: action.payload.user,  // Store user info
                isLoggedIn: true,  // Set login status
            };

        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                user: action.payload,
                isLoggedIn: true,
            };

        case GET_ALL_USER_SUCCESS:  // Add success case for fetching all users
            return {
                ...state,
                isLoading: false,
                error: null,
                users: action.payload,  // Store all users data
            };

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case GET_ALL_USER_FAILURE:  // Add failure case for fetching all users
            return { ...state, isLoading: false, error: action.payload };

        case LOGOUT:
            return { ...initialState };  // Reset the state on logout

        default:
            return state;
    }
};
