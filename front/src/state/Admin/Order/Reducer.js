import {
    CANCEL_ORDER_FAILURE,
    CANCEL_ORDER_REQUEST,
    CANCEL_ORDER_SUCCESS,
    CONFIRM_ORDER_FAILURE,
    CONFIRM_ORDER_REQUEST,
    CONFIRM_ORDER_SUCCESS,
    DELETE_ORDER_FAILURE,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELIVERED_ORDER_FAILURE,
    DELIVERED_ORDER_REQUEST,
    DELIVERED_ORDER_SUCCESS,
    GET_ORDER_FAILURE,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    PLACED_ORDER_FAILURE,
    PLACED_ORDER_REQUEST,
    PLACED_ORDER_SUCCESS,
    SHIP_ORDER_FAILURE,
    SHIP_ORDER_REQUEST,
    SHIP_ORDER_SUCCESS
} from "./ActionTypes";

const initialState = {
    loading: false,
    orders: [],
    error: ""
};

export const adminOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
                error: ""
            }
        case GET_ORDER_FAILURE:
            return {
                loading: false,
                orders: [],
                error: action.payload
            }
        case CONFIRM_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PLACED_ORDER_REQUEST:
        case CANCEL_ORDER_REQUEST:
            return {
                ...state,
                idLoading: true,
            }
        // case CONFIRM_ORDER_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         orders: state.orders.map(order =>
        //             order._id === action.payload._id ? { ...order, ...action.payload } : order
        //         ),
        //         error: null,
        //     };
        case CONFIRM_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.map(order =>
                    order._id === action.payload._id ? { ...order, orderStatus: 'CONFIRMED', ...action.payload } : order
                ),
                error: null,
            };
        case PLACED_ORDER_SUCCESS:
            return {
                ...state,
                placed: action.payload,
                isLoading: false
            };
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.filter(order => order._id !== action.payload)
            };

        case CANCEL_ORDER_SUCCESS:
            return {
                ...state,
                cancled: action.payload,
                isLoading: false
            }

        case CONFIRM_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case PLACED_ORDER_FAILURE:
        case CANCEL_ORDER_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        case DELETE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SHIP_ORDER_REQUEST:
            return { ...state, isLoading: true, error: null }
        // case SHIP_ORDER_SUCCESS:
        //     if (!action.payload) {
        //         return state;
        //     }
        //     return {
        //         ...state,
        //         isLoading: false,
        //         orders: state.orders.map(order =>
        //             order._id === action.payload._id ? { ...order, orderStatus: 'SHIPPED', ...action.payload } : order
        //         ),
        //     };
        case SHIP_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                orders: state.orders.map(order =>
                    order._id === action.payload._id ? { ...order, orderStatus: 'SHIPPED', ...action.payload } : order
                ),
            };
        case SHIP_ORDER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case DELIVERED_ORDER_REQUEST:
            return { ...state, isLoading: true, error: null }
        // case DELIVERED_ORDER_SUCCESS:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         orders: state.orders.map(order =>
        //             order._id === action.payload._id ? { ...order, orderStatus: 'DELIVERED' } : order
        //         ),
        //     }
        case DELIVERED_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                orders: state.orders.map(order =>
                    order._id === action.payload._id ? { ...order, orderStatus: 'DELIVERED' } : order
                ),
            };
        case DELIVERED_ORDER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
