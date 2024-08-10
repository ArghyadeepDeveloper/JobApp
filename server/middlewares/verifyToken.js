import jwt from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret"; // Replace with your actual secret key

const verifyToken = (req, res, next) => {
  // Get the token from the request header
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the decoded user information to the request object
    req.user = decoded;
    console.log("from verify token, ", req.user);
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // console.error("Token verification error:", error);
    res.status(400).json({ message: "Invalid token." });
  }
};

export default verifyToken;
