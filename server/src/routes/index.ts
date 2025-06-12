import { Router } from "express";
import AuthController from "../controllers/AuthControllers.js";
import authMiddleware from "../middlewares/AuthMiddleware.js";
import ChatGroupController from "../controllers/ChatGroupControllers.js";

// Create a new Router instance
const router = Router();

// ======================== Auth Routes ======================== //


// Route for logging in the user
router.post("/auth/login", AuthController.login);


// ============================   Chat Group Routes ============================ // 

// Create a new chat group (Protected route)
router.post("/chat-group", authMiddleware, ChatGroupController.store);

// Get a single chat group by ID (Protected route)
router.get("/chat-group/:id", authMiddleware, ChatGroupController.show);

// Get all chat groups (Protected route)
router.get("/chat-group", authMiddleware, ChatGroupController.index);

// Update a specific chat group by ID (Protected route)
router.put("/chat-group/:id", authMiddleware, ChatGroupController.update);
 
// Delete a specific chat group by ID (Protected route)
router.delete("/chat-group/:id", authMiddleware, ChatGroupController.destroy);












// Export the router for use in the main app
export default router;
