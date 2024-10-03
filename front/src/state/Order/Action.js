
import { api } from "../../config/Api";
import {
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    FIND_ORDER_BY_ID_FAILURE,
    FIND_ORDER_BY_ID_REQUEST,
    FIND_ORDER_BY_ID_SUCCESS,
    ORDER_HISTORY_FAILURE,
    ORDER_HISTORY_REQUEST,
    ORDER_HISTORY_SUCCESS
} from "./ActionType";

export const createNewOrder = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });

    try {
        const { data } = await api.post(`/api/orders/`, reqData.address);
        if (data._id) {
            reqData.navigate(`/checkout?step=2&order_id=${data._id}`);
        }
        // console.log("order_data_id", data._id);
        // console.log("createNewOrder-", data);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
    }
};

export const orderHistory = (userId) => async (dispatch) => {
    dispatch({ type: ORDER_HISTORY_REQUEST });
    try {
        const { data } = await api.get(`/api/orders/user/${userId}`);  // Correct the URL to include userId
        console.log("order history", data)
        dispatch({ type: ORDER_HISTORY_SUCCESS, payload: data });
    } catch (error) {
        console.error("Error fetching order history:", error.message);
        dispatch({ type: ORDER_HISTORY_FAILURE, payload: error.message });
    }
};
export const orderHistoryS = (userId) => async (dispatch) => {
    dispatch({ type: ORDER_HISTORY_REQUEST });
    try {
        const { data } = await api.get(`/api/orders/users/${userId}`);  // Correct the URL to include userId
        console.log("order history", data)
        dispatch({ type: ORDER_HISTORY_SUCCESS, payload: data });
    } catch (error) {
        console.error("Error fetching order history:", error.message);
        dispatch({ type: ORDER_HISTORY_FAILURE, payload: error.message });
    }
};



export const findOrderById = (orderId) => async (dispatch) => {
    dispatch({ type: FIND_ORDER_BY_ID_REQUEST });

    try {
        const { data } = await api.get(`/api/orders/${orderId}`);
        console.log("get order by id -", data);
        dispatch({ type: FIND_ORDER_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FIND_ORDER_BY_ID_FAILURE, payload: error.message });
    }
};
