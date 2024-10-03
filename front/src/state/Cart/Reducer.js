import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType"

const initialState = {
  cart: null,
  loading: false,
  error: null,
  cartItems: []
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART_REQUEST:
      return { ...state, loading: true, error: null };
    // case ADD_ITEM_TO_CART_SUCCESS:
    //     return {
    //         ...state,
    //         cartItems: [...state.cartItems, ...action.payload.cartItems],
    //         loading: false
    //     };
    case ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        cartItems: [...state.cartItems, ...(action.payload.cart?.cartItems || [])],
        loading: false,
      };
    case ADD_ITEM_TO_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case GET_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    // case GET_CART_SUCCESS:
    //     return {
    //         ...state,
    //         cartItems: action.payload.cartItems,
    //         cart: action.payload,
    //         loading: false,
    //     };
    case GET_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.cart?.cartItem || [], // Access cartItem correctly
        cart: action.payload,
        loading: false,
      };

    case GET_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case REMOVE_CART_ITEM_REQUEST:
      return { ...state, loading: true };
    case UPDATE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItem: state.cart.cartItem.filter(item => item._id !== action.payload),
        },
        loading: false,
      };
    case UPDATE_CART_ITEM_SUCCESS:
      const updatedCartItem = state.cart.cartItem.map(item =>
        item._id === action.payload._id ? action.payload : item
      );

      // Calculate the total price again, but use the price sent by the backend
      const updatedTotalPrice = updatedCartItem.reduce((acc, item) => acc + item.price, 0);

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItem: updatedCartItem,
          totalPrice: updatedTotalPrice,
        },
        loading: false,
      };


    case REMOVE_CART_ITEM_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case UPDATE_CART_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}