import { Router } from "express";

const userRouter = Router();

userRouter.get("/anurag", (_, res) => {
  return res.json({
    message: {
      name: "Anurag",
      age: 27,
    },
  });
});

export default userRouter;
