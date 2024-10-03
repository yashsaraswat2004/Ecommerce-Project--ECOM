import userService from "../services/user.services.js"


const getUserProfile = async (req, res) => {
    try {
        const jwt = req.headers.authorization?.split(" ")[1];

        if (!jwt) {
            return res.status(404).send({ error: "token not found" })
        }

        const user = await userService.getUserProfileByToken(jwt)

        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUser();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};





export default { getUserProfile, getAllUsers };