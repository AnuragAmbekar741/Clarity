import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  return res.json({
    message: "Server health 100%",
  });
});

export default router;
