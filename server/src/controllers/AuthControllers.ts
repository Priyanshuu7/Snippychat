import { Request, Response } from "express";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";

// Interface defining the structure of login payload data
interface LoginPayLoadType {
    name: string;
    email: string;
    provider: string;
    oauth_id: string;
    image?: string;
}

// Controller class for handling authentication operations
class AuthController {
    /**
     * Handles user login/registration
     * If user exists, logs them in
     * If user doesn't exist, creates new account
     * Returns JWT token for authentication
     */
    static async login(req: Request, res: Response) {
        try {
            // Extract login data from request body
            const body: LoginPayLoadType = req.body;

            // Check if user already exists
            let findUser = await prisma.user.findUnique({
                where: {
                    email: body.email,
                },
            });

            // Create new user if doesn't exist
            if (!findUser) {
                findUser = await prisma.user.create({
                    data: body,
                });
            }

            // Prepare JWT payload
            const JWTPAYLOAD = {
                name: body.name,
                email: body.email,
                id: findUser.id,
            };

            // Generate JWT token with 1 year expiry
            const token = jwt.sign(JWTPAYLOAD, process.env.JWT_SECRET!, {
                expiresIn: "365d",
            });

            // Return success response with user data and token
            return res.json({
                message: "Logged in successfully !!",
                user: {
                    ...findUser,
                    token: `Bearer ${token}`,
                },
            });
        } catch (error) {
            // Handle any errors during login process
            return res.status(500).json({ message: "Something went wrong." });
        }
    }
}

export default AuthController;
