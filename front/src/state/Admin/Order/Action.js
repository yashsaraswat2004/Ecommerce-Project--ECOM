import { api } from "../../../config/Api";
import { CANCEL_ORDER_FAILURE, CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, CONFIRM_ORDER_FAILURE, CONFIRM_ORDER_REQUEST, CONFIRM_ORDER_SUCCESS, DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELIVERED_ORDER_FAILURE, DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCCESS, GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, SHIP_ORDER_FAILURE, SHIP_ORDER_REQUEST, SHIP_ORDER_SUCCESS } from "./ActionTypes"


export const getOrder = () => {
    return async (dispatch) => {
        dispatch({ type: GET_ORDER_REQUEST });
        try {
            const response = await api.get(`/api/admin/orders/`);
            console.log("get all orders", response.data)
            dispatch({ type: GET_ORDER_SUCCESS, payload: response.data })
        } catch (error) {
            console.log("error in getting all orders", error);
            dispatch({ type: GET_ORDER_FAILURE, payload: error.message })
        }
    }
}

export const confirmOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CONFIRM_ORDER_REQUEST });
    try {
        const response = await api.put(`/api/admin/orders/${orderId}/confirmed`);

        if (response.status === 200) {
            const data = await response.data; // Use response.data with axios
            dispatch({ type: CONFIRM_ORDER_SUCCESS, payload: data });
        } else {
            const errorData = await response.data; // Use response.data with axios
            dispatch({ type: CONFIRM_ORDER_FAILURE, payload: errorData.message });
        }
    } catch (error) {
        dispatch({ type: CONFIRM_ORDER_FAILURE, payload: error.message });
    }
};


export const deliveredOrder = (orderId) => async (dispatch) => {
    dispatch({ type: DELIVERED_ORDER_REQUEST });
    try {
        const response = await api.put(`/api/admin/orders/${orderId}/deliver`);
        const data = response.data;
        console.log("deliver_order", data);
        dispatch({ type: DELIVERED_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: DELIVERED_ORDER_FAILURE, payload: error.message })
    }
}



export const shipOrder = (orderId) => {
    return async (dispatch) => {
        dispatch({ type: SHIP_ORDER_REQUEST });
        try {
            const response = await api.get(`/api/admin/orders/${orderId}/ship`); // Corrected here
            console.log("ship order", response.data); // Log response.data
            dispatch({ type: SHIP_ORDER_SUCCESS, payload: response.data }); // Ensure you are dispatching the correct data
        } catch (error) {
            console.log("error in getting all orders", error);
            dispatch({ type: SHIP_ORDER_FAILURE, payload: error.message });
        }
    };
};


export const cancelOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CANCEL_ORDER_REQUEST });
    try {
        const response = await api.put(`/api/admin/orders/${orderId}/cancel`);
        const data = response.data;
        console.log("cancel_order", data);
        dispatch({ type: CANCEL_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CANCEL_ORDER_FAILURE, payload: error.message })
    }
}

export const delteOrder = (orderId) => {
    return async (dispatch, getState) => {
        dispatch({ type: DELETE_ORDER_REQUEST });
        try {
            const response = await api.delete(`/api/admin/orders/${orderId}/delete`);
            dispatch({ type: DELETE_ORDER_SUCCESS, payload: orderId });
        } catch (error) {
            console.log("error deleting orders", error);
            dispatch({ type: DELETE_ORDER_FAILURE, payload: error.message });
        }
    }
}
