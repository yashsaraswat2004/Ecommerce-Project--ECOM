import orderServices from "../services/order.services.js";

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderServices.getAllOrders();
        return res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const confirmOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedOrder = await orderServices.confirmOrder(orderId);
        return res.status(200).json(updatedOrder);
    } catch (error) {
        return res.status(500).send(error.message); // Make sure to return on error
    }
};

const shipOder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedOrder = await orderServices.shiftOrder(orderId);
        return res.status(200).json(updatedOrder);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


const deliverOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedOrder = await orderServices.deliveredOrder(orderId);
        return res.status(200).json(updatedOrder);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


const cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedOrder = await orderServices.cancelledOrder(orderId);
        return res.status(200).json(updatedOrder);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const orders = await orderServices.deleteOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const deleteCustomer = async (req, res) => {
    try {
        const orderId = req.params.id;
        const orders = await orderServices.deleteCustomer(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export default { deleteOrder, cancelOrder, deleteCustomer, deliverOrder, getAllOrders, shipOder, confirmOrder }
