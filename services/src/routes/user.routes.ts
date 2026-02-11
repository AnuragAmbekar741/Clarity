import { Router } from "express";
import { asyncHandler } from "../middleware/async-handler.js";
import * as userController from "../controllers/user.controller.js";

const userRouter = Router();

// Create a new user
userRouter.post("/", asyncHandler(userController.createUser));

// Get all users with pagination
userRouter.get("/", asyncHandler(userController.getAllUsers));

// Get users by age range
userRouter.get("/age", asyncHandler(userController.findUsersByAge));

// Get a specific user by ID
userRouter.get("/:id", asyncHandler(userController.getUser));

// Update a user
userRouter.put("/:id", asyncHandler(userController.updateUser));

// Delete a user
userRouter.delete("/:id", asyncHandler(userController.deleteUser));

export default userRouter;
