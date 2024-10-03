import { api, API_BASE_URL } from "../../config/Api";
import { CREATE_PRODUCTS_FAILURE, CREATE_PRODUCTS_REQUEST, CREATE_PRODUCTS_SUCCESS, DELETE_PRODUCTS_FAILURE, DELETE_PRODUCTS_REQUEST, DELETE_PRODUCTS_SUCCESS, FIND_PRODUCT_BY_ID_2_FAILURE, FIND_PRODUCT_BY_ID_2_REQUEST, FIND_PRODUCT_BY_ID_2_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS } from "./ActionType";

// export const findProducts = (reqData) => async (dispatch) => {
//     dispatch({ type: FIND_PRODUCTS_REQUEST });

//     const { colors, sizes, miniPrice, maxPrice, category, stock, sort, pageNumber, pageSize } = reqData;

//     try {
//         const { data } = await api.get(`/api/product?color=${colors}&size=${sizes}&miniPrice=${miniPrice}&maxPrice=${maxPrice}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`);


//         // console.log("API Product Data Response:", data);

//         // dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data })
//         dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data.content });


//     } catch (error) {
//         console.error('Error Fetching Products:', error.message);
//         dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
//     }
// };

export const findProducts = (reqData) => async (dispatch) => {
    const { colors, sizes, miniPrice, maxPrice, category, stock, sort, pageNumber, pageSize } = reqData;

    try {
        const { data } = await api.get('/api/product', {
            params: { colors, sizes, miniPrice, maxPrice, category, stock, sort, pageNumber, pageSize }
        });

        console.log('API Data:', data);

        dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data.content });
    } catch (error) {
        dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
    }
};

export const findProducts2 = (reqData) => async (dispatch) => {
    const { colors, sizes, miniPrice, maxPrice, lavelOne, lavelTwo, stock, sort, pageNumber, pageSize } = reqData;

    try {
        const { data } = await api.get('/api/product', {
            params: {
                colors,
                sizes,
                miniPrice,
                maxPrice,
                lavelOne: lavelOne || "Men",   // Default to "Men"
                lavelTwo: lavelTwo || "Mens Top Wear",  // Default to "Mens Top Wear"
                stock,
                sort,
                pageNumber,
                pageSize
            }
        });

        console.log('API Data:', data);

        dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data.content });
    } catch (error) {
        dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
    }
};


export const findProductsById = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });

    // Assuming reqData is an object with productId
    const { productId } = reqData;

    try {
        const { data } = await api.get(`/api/product/id/${productId}`);
        dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
    }
};

export const findProductsById2 = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_2_REQUEST });

    // Assuming reqData is an object with productId
    const { productId } = reqData;

    try {
        const { data } = await api.get(`/api/product/id/${productId}`);
        dispatch({ type: FIND_PRODUCT_BY_ID_2_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_ID_2_FAILURE, payload: error.message });
    }
};

export const crateProduct = (product) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PRODUCTS_REQUEST })

        const { data } = await api.post('/api/admin/products/', product);
        dispatch({
            type: CREATE_PRODUCTS_SUCCESS,
            payload: data
        })
        console.log("created product", data)
    } catch (error) {
        dispatch({ type: CREATE_PRODUCTS_FAILURE, payload: error.message });
    }
}

export const deleteProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCTS_REQUEST })

        const { data } = await api.delete(`${API_BASE_URL}/api/admin/productS/${productId}`);
        console.log("delete product", data)
        dispatch({
            type: DELETE_PRODUCTS_SUCCESS,
            payload: productId
        })
    } catch (error) {
        dispatch({ type: DELETE_PRODUCTS_FAILURE, payload: error.message });
    }
}