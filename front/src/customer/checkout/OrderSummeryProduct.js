import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useDispatch } from "react-redux";
import { removeCartItem } from '../../state/Cart/Action';

const OrderSummeryProduct = ({ item }) => {
    const dispatch = useDispatch();

    const handleRemoveCartItem = () => {
        dispatch(removeCartItem(item._id)) //or item.id
    };

    return (
        <div className='p-5 shadow-lg border rounded-md'>
            <div className="flex items-center">
                {/* Check if item.product exists and map over it since it's an array */}
                {item.product && item.product.length > 0 ? (
                    item.product.map((prod) => (
                        <div key={prod._id} className='flex'>
                            <div className='w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]'>
                                <img
                                    className='w-full h-full object-cover object-top'
                                    src={prod.imageUrl || '/placeholder.jpg'} // Handle missing image
                                    alt={prod.title || 'Product Image'}
                                />
                            </div>
                            <div className="ml-5 space-y-1">
                                <p className="opacity-70 mt-2">{prod.title}</p>
                                <p className="">{prod.description}</p>
                                <p className="opacity-70 mt-2">SIZE: {item.size}</p>
                                <p className='font-semibold opacity-95'> MRP : ₹{prod.price}  </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No product information available</p>
                )}

                <IconButton onClick={handleRemoveCartItem}>
                    <DeleteIcon sx={{ color: "gray", fontSize: 35, marginLeft: 10 }} />
                </IconButton>
            </div>
        </div>
    );
};

export default OrderSummeryProduct;
