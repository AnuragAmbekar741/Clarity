import { Request, Response } from "express";
import { ValidationError } from "../../utils/errors.js";

export const googleCallback = async (req: Request, res: Response) => {
  const { code } = req.body;
  if (!code) throw new ValidationError("Code required");
};
