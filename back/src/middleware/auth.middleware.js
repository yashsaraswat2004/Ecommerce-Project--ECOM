import jwtProvider from "../config/jwtProvider.js";
import userServices from "../services/user.services.js";

const authenticate = async (req, res, next) => {
  let token;

  // Check for authorization header and token format
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode the token and get the user ID
      const userId = jwtProvider.getUserIdFromToken(token); // Assuming it synchronously returns userId

      // Find the user by ID
      const user = await userServices.findUserById(userId);

      // If user doesn't exist, throw an error
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Attach the user object to the request
      req.user = user;

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      // Handle token-related or user lookup errors
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    // If no token is provided in the headers
    return res.status(401).json({ message: "Token not provided" });
  }
};

export default authenticate;
