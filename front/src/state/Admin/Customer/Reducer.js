import { DELETE_CUSTOMER_FAILURE, DELETE_CUSTOMER_REQUEST, DELETE_CUSTOMER_SUCCESS, GET_ALL_USER_FAILURE, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS } from "./ActionTypes";

const initialState = {
    user: null,
    users: [],  // For storing multiple users
    isLoading: false,
    error: null,
    jwt: null,
    isLoggedIn: false,  // To track login status
};

export const adminCustomer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_USER_REQUEST:  // Add handler for getting all users
            return { ...state, isLoading: true, error: null };

        case DELETE_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.filter(order => order._id !== action.payload)
            };
        case DELETE_CUSTOMER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_CUSTOMER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case GET_ALL_USER_SUCCESS:  // Add success case for fetching all users
            return {
                ...state,
                isLoading: false,
                error: null,
                users: action.payload,  // Store all users data
            };

        case GET_ALL_USER_FAILURE:  // Add failure case for fetching all users
            return { ...state, isLoading: false, error: action.payload };



        default:
            return state;
    }
};
