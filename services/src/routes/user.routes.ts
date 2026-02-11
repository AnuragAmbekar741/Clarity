import { Router } from "express";
import { asyncHandler } from "../middleware/async-handler.js";

const userRouter = Router();

userRouter.get(
  "/anurag",
  asyncHandler(async (_, res) => {
    return res.json({
      message: {
        name: "Anurag",
        age: 27,
      },
    });
  })
);

export default userRouter;
