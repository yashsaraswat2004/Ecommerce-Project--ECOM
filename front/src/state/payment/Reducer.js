import {
    CREATE_PAYMENT_REQUEST,
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_FAILURE,
    UPDATE_PAYMENT_REQUEST,
    UPDATE_PAYMENT_SUCCESS,
    UPDATE_PAYMENT_FAILURE
} from "./ActionTypes";

// Initial state for the payment reducer
const initialState = {
    loading: false,
    paymentLink: null,
    paymentSuccess: false,
    error: null,
};

// Reducer function
export const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PAYMENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case CREATE_PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                paymentLink: action.payload,
                paymentSuccess: true,
                error: null,
            };
        case CREATE_PAYMENT_FAILURE:
            return {
                ...state,
                loading: false,
                paymentSuccess: false,
                error: action.payload,
            };
        case UPDATE_PAYMENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case UPDATE_PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                paymentSuccess: true,
                error: null,
            };
        case UPDATE_PAYMENT_FAILURE:
            return {
                ...state,
                loading: false,
                paymentSuccess: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
