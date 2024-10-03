import mongoose from "mongoose";

const paymentInformationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    paymentMethod: {
        type: String,
        required: true
    },
    transactionId: {
        type: String
    },
    paymentId: {
        type: String
    },
    paymentStatus: {
        type: String,
        default: "PENDING"
    }
});

const PaymentInformation = mongoose.model("payment_information", paymentInformationSchema);
export default PaymentInformation;
