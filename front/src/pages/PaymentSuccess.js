import { Alert, AlertTitle, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddressCart from '../customer/AddressCart/AddressCart'
import OrderTracking from '../customer/orderDetails/OrderTracking'
import { useDispatch, useSelector } from 'react-redux'
import { findOrderById } from '../state/Order/Action'
import { useParams } from 'react-router-dom'
import { updatePayment } from '../state/payment/Action'

const PaymentSuccess = () => {
    const [paymentId, setPaymentId] = useState();
    const [paymentStatus, setPaymentStatus] = useState();
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const { order } = useSelector(store => store);
    const { paymentSuccess, error, loading } = useSelector((store) => store.payment);

    useEffect(() => {
        const urlParam = new URLSearchParams(window.location.search);
        setPaymentId(urlParam.get("razorpay_payment_id"))
        setPaymentStatus(urlParam.get("razorpay_payment_link_status"))
    }, [])

    useEffect(() => {
        if (paymentId) {
            const data = { orderId, paymentId }
            dispatch(findOrderById(orderId))
            dispatch(updatePayment(data))
        }
    }, [orderId, paymentId])

    useEffect(() => {
        if (error) {
            // alert(`Payment Update Error: ${error}`);
        }
        if (paymentSuccess) {
            alert("Payment has been successfully updated!");
        }
    }, [error, paymentSuccess]);

    if (loading) {
        return <div>Loading payment details...</div>;
    }
    return (
        <div className='px-2 lg:px-36'>
            <div className="flex flex-col justify-center items-center">
                <Alert
                    variant='filled'
                    severity='success'
                    sx={{ mb: 6, width: "fit-content" }}
                >
                    <AlertTitle>Payment Success</AlertTitle>
                    Congratulation your order get placed
                </Alert>
            </div>

            <OrderTracking avtiveStep={1} />

            <Grid container className='space-y-5 py-5 pt-20'>
                {order?.order?.orderItems?.map((item) => <Grid container item className='' sx={{ alignItems: "center", justifyContent: "space-between" }}
                >
                    <Grid item xs={6}>
                        <div className="flex items-center">
                            <img src={item.product[0].imageUrl} className='w-[5rem] h-[5rem] object-cover origin-top' alt="" />

                            <div className="ml-5 space-y-2">
                                <p>{item.product.title}</p>
                                <div className='opacity-50 text-xs font-semibold space-x-5' >
                                    <span>Size:{item.size}</span>
                                </div>
                                <p>Seller :{item.product[0].brand}</p>
                                <p>₹ {item.price}</p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item>
                        <AddressCart address={order.order?.shippingAddress} />
                    </Grid>

                </Grid>)}
            </Grid>
        </div>
    )
}

export default PaymentSuccess
