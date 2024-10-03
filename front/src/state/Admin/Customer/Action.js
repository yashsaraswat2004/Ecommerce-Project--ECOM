import { api } from "../../../config/Api";
import { DELETE_CUSTOMER_FAILURE, DELETE_CUSTOMER_REQUEST, DELETE_CUSTOMER_SUCCESS, GET_ALL_USER_FAILURE, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS } from "./ActionTypes";

export const getAllCustomer = () => async (dispatch) => {
    dispatch({ type: GET_ALL_USER_REQUEST });  // Correct action type for fetching all users
    try {
        const { data } = await api.get('/api/users/');  // Ensure the correct API endpoint
        dispatch({ type: GET_ALL_USER_SUCCESS, payload: data });  // Dispatch success with data
        console.log("all customer", data);
    } catch (error) {
        dispatch({ type: GET_ALL_USER_FAILURE, payload: error.message });  // Handle failure
    }
};


export const delteOrder = (orderId) => {
    return async (dispatch, getState) => {
        dispatch({ type: DELETE_CUSTOMER_REQUEST });
        try {
            const response = await api.delete(`/api/admin/orders/customer/${orderId}/delete`);
            dispatch({ type: DELETE_CUSTOMER_SUCCESS, payload: orderId });
        } catch (error) {
            console.log("error deleting customer", error);
            dispatch({ type: DELETE_CUSTOMER_FAILURE, payload: error.message });
        }
    }
}
