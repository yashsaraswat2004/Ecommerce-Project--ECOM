import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../state/Cart/Action";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InfinitySpin } from "react-loader-spinner";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading } = useSelector((store) => store.cart);

  const handleCheckOut = () => {
    if (cart?.cartItem?.length > 0) {
      navigate("/checkout?step=1");
    } else {
      toast.error("Your cart is empty. Add items before checkout.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="absolute top-[50%] left-[45%]">
        <InfinitySpin color="black" radius={"8px"} />;
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <div className="lg:flex lg:px-16 gap-5 relative h-[100vh] mt-10">
        <div className="flex-[2] overflow-y-auto">
          {cart?.cartItem && cart.cartItem?.length > 0 ? (
            cart.cartItem?.map((item) => (
              <CartItem key={item._id} item={item} />
            ))
          ) : (
            <div className="text-center py-28">
              <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
              <Link
                to="/"
                className="text-gray-600 hover:text-black flex items-center justify-center"
              >
                <button className="flex items-center border border-gray-600 px-4 py-2 rounded-md">
                  <FaArrowLeft className="mr-2" />
                  Continue Shopping
                </button>
              </Link>
            </div>
          )}
        </div>
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Order Summary
            </h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹ {cart?.totalPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">₹ {cart?.totalPrice}</span>
              </div>
            </div>
            <button
              className=" w-full mt-4 bg-black py-2 rounded-md text-white"
              onClick={handleCheckOut}
            >
              Go to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
