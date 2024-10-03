import {
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    FIND_ORDER_BY_ID_FAILURE,
    FIND_ORDER_BY_ID_REQUEST,
    FIND_ORDER_BY_ID_SUCCESS,
    ORDER_HISTORY_REQUEST,
    ORDER_HISTORY_SUCCESS,
    ORDER_HISTORY_FAILURE
} from "./ActionType";

const initialState = {
    orders: [],
    order: null,
    error: null,
    loading: false
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                order: action.payload,
                error: null
            };
        case CREATE_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case FIND_ORDER_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FIND_ORDER_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
                error: null
            }
        case FIND_ORDER_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ORDER_HISTORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ORDER_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
                error: null
            };
        case ORDER_HISTORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default orderReducer;
