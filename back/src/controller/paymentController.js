import paymentService from "../services/paymentService.js"

const createPaymentLink = async (req, res) => {
    try {
        const paymentLink = await paymentService.createPaymentLink(req.params.id)

        return res.status(200).send(paymentLink);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const updatePaymentInfo = async (req, res) => {
    try {
        await paymentService.updatePaymentInfo(req.query)

        return res.status(200).send({ message: "payment information updated", status: true });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
export { createPaymentLink, updatePaymentInfo }