import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../state/Cart/Action";

const TotalBillSummary = ({ subtotal, taxRate }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart } = useSelector(store => store)

    const handleCheckOut = () => {
        navigate('/checkout?step=1');
    }

    useEffect(() => {
        dispatch(getCart())
    }, [cart.updateCartItem, cart.deleteCartItem])

    return (
        <div className="p-6 bg-white shadow rounded mt-4 fixed w-[400px]">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2">
                <span>Subtotal Price:</span>
                <span>₹ {cart.cart?.totalPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
                <span>Shipping Cost:</span>
                <span>Free</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg">
                <span>Estimated Total:</span>
                <span>₹ {cart.cart?.totalPrice}</span>
            </div>
            <button
                type="button"
                className="mt-8 h-[45px] w-[350px] bg-black text-white rounded-xl font-bold"
                onClick={handleCheckOut}
            >
                Place Order
            </button>
        </div>
    );
};

export default TotalBillSummary;
