import orderServices from "../services/order.services.js"

const createOrder = async (req, res) => {
    try {
        const user = req.user;
        const createNewOrder = await orderServices.createOrder(user, req.body);

        return res.status(201).send(createNewOrder);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


const findOrderById = async (req, res) => {
    try {
        const userId = req.params.id;
        const order = await orderServices.findOrderById(userId);
        if (!order) {
            return res.status(404).send("Order not found");
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


const OrderHistory = async (req, res) => {
    try {
        const userId = req.params.id;
        const orders = await orderServices.userOrderHistory(userId);
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export default { createOrder, findOrderById, OrderHistory };
