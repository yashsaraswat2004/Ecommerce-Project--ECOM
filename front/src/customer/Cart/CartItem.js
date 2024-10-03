import { IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../state/Cart/Action";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleUpdateCartItem = (num) => {
    // Optimistically update the state
    const updatedQuantity = item.quantity + num;
    // dispatch({
    //     type: UPDATE_CART_ITEM_SUCCESS,
    //     payload: { ...item, quantity: updatedQuantity },
    // });

    // Then make the API call to confirm the change
    const data = { data: { quantity: updatedQuantity }, CartItemId: item?._id };
    dispatch(updateCartItem(data));
  };

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem(item._id));
  };

  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className='w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]'>
          <img
            className='w-full h-full object-cover object-top'
            src={item.product?.imageUrl || '/placeholder.jpg'}
            alt={item.product?.title || 'Product Image'}
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-semibold">{item.product?.title}</p>
          <p className="opacity-70 mt-2">{item.size}</p>
          <p className="opacity-70 mt-2">{item.product?.brand}</p>
          <p className='font-semibold opacity-95'> price with discount : ₹{item.product?.price} </p>
          <p className='font-semibold opacity-95'> MRP : ₹{item.product?.price} </p>


        </div>
      </div>

      <div className='lg:flex items-center lg:scroll-px-10 pt-4'>
        <div className='flex items-center space-x-2'>

          <IconButton onClick={() => handleUpdateCartItem(-1)} disabled={item.quantity <= 1} >
            <RemoveCircleOutlineIcon />
          </IconButton>

          <span className='py-1 px-7  rounded-r-sm'> {item.quantity} </span>

          <IconButton onClick={() => handleUpdateCartItem(1)}  >
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
        <div className='ml-7'>
          <IconButton onClick={handleRemoveCartItem} >
            <DeleteIcon sx={{ color: "gray", fontSize: 35 }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
