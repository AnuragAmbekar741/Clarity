import { Request, Response } from "express";
import { ValidationError } from "../../utils/errors.js";
import { AuthService } from "./auth.service.js";

export class AuthController {
  private authService = new AuthService();

  async googleCallback(req: Request, res: Response) {
    const { idToken } = req.body;
    if (!idToken) throw new ValidationError("idToken required");
    const result = await this.authService.googleCallback(idToken);
    return res.status(200).json({
      status: "success",
      data: result,
    });
  }
}
