import { razorpay } from "../config/razorPayCLient.js";
import orderService from "../services/order.services.js"


const createPaymentLink = async (orderId) => {
    try {
        const order = await orderService.findOrderById(orderId);

        if (!order) {
            throw new Error("Order not found.");
        }

        const paymentLinkRequest = {
            amount: order.totalPrice * 100, 
            currency: "INR",
            customer: {
                name: `${order.user.firstName} ${order.user.lastName}`,
                email: order.user.email, 
                contact: order.user.mobile, 
            },
            notify: {
                sms: true,
                email: true,
            },
            callback_url: `http://localhost:3000/payment/${orderId}`,
            callback_method: 'get',
        };

        const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);
        if (!paymentLink) {
            throw new Error("Payment link creation failed");
        }

        return {
            paymentLinkId: paymentLink.id,
            payment_link_url: paymentLink.short_url,
        };
    } catch (razorpayError) {
        console.error("Razorpay Error:", razorpayError);
        console.error("Error details:", razorpayError.error);
        throw new Error(`Error creating payment link: ${razorpayError.message}`);
    }

};

const updatePaymentInfo = async (reqData) => {
    const { payment_id, order_id } = reqData;

    try {
        const order = await orderService.findOrderById(order_id);

        if (!order) {
            throw new Error("Order not found");
        }

        const payment = await razorpay.payments.fetch(payment_id);

        if (payment.status === "captured") {
            if (order.paymentDetails.status === "COMPLETED") {
                throw new Error("Payment already completed");
            }

            order.paymentDetails.paymentId = payment_id;
            order.paymentStatus.status = "COMPLETED";
            order.orderStatus = "PLACED";

            await order.save();
            return { message: "Your order is placed", success: true };
        } else {
            throw new Error("Payment not captured. Status: " + payment.status);
        }

    } catch (error) {
        throw new Error("Error updating payment info: " + error.message);
    }
}


export default { createPaymentLink, updatePaymentInfo }