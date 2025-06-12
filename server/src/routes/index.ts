import { Router } from "express";
import AuthController from "../controllers/AuthControllers.js";
import authmiddlware from "../middlewares/AuthMiddleware.js";
import ChatGroupController from "../controllers/ChatGroupControllers.js";

const router  = Router()

//Auth route//
router.post("/auth/login", AuthController.login);

//Chat-group route//
router.post("/chat-group",authmiddlware,ChatGroupController.store)
router.get("/chat-group/:id",authmiddlware,ChatGroupController.show)
router.get("/chat-group",authmiddlware,ChatGroupController.index)
router.put("/chat-group/:id",authmiddlware,ChatGroupController.update)
router.delete("/chat-group/:id",authmiddlware,ChatGroupController.destroy)

//

export default router;