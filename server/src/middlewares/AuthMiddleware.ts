import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Define the middleware function
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Get the Authorization header from the request
    const authHeader = req.headers.authorization;

    // Check if the header is missing or null
    if (authHeader === null || authHeader === undefined) {
        return res.status(401).json({ message: "You are unauthorized" });
    }

    // Extract the token from the "Bearer <token>" format
    const token = authHeader.split(" ")[1];

    // Verify the token using the secret key
    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
        // If token is invalid or expired
        if (err) {
            return res.status(401).json({ message: "You are unauthorized" });
        }

        // Attach the decoded user data to the request object
        req.user = user as AuthUser;

        // Proceed to the next middleware or route handler
        next();
    });
};

export default authMiddleware;
