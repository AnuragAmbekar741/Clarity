import { Request, Response } from "express";
import { UserService } from "../services/user.service.js";
import { ValidationError } from "../utils/errors.js";

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
  const { name, email, age } = req.body;

  // Validate required fields
  if (!name || !email || age === undefined) {
    throw new ValidationError("Name, email, and age are required");
  }

  const user = await userService.createUser({ name, email, age });

  return res.status(201).json({
    status: "success",
    data: user,
  });
};

export const getUser = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = await userService.getUserById(id);

  return res.status(200).json({
    status: "success",
    data: user,
  });
};

export const getAllUsers = async (req: Request, res: Response) => {
  const skipStr = typeof req.query.skip === "string" ? req.query.skip : "0";
  const takeStr = typeof req.query.take === "string" ? req.query.take : "10";
  const skip = parseInt(skipStr) || 0;
  const take = parseInt(takeStr) || 10;

  const { users, total } = await userService.getAllUsers({ skip, take });

  return res.status(200).json({
    status: "success",
    data: users,
    pagination: {
      total,
      skip,
      take,
    },
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { name, age, isActive } = req.body;

  const user = await userService.updateUser(id, { name, age, isActive });

  return res.status(200).json({
    status: "success",
    data: user,
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await userService.deleteUser(id);

  return res.status(204).send();
};

export const findUsersByAge = async (req: Request, res: Response) => {
  const minAgeStr = typeof req.query.minAge === "string" ? req.query.minAge : "";
  const maxAgeStr = typeof req.query.maxAge === "string" ? req.query.maxAge : "";
  const minAge = parseInt(minAgeStr);
  const maxAge = parseInt(maxAgeStr);

  if (isNaN(minAge) || isNaN(maxAge)) {
    throw new ValidationError("minAge and maxAge must be valid numbers");
  }

  const users = await userService.findUsersByAge(minAge, maxAge);

  return res.status(200).json({
    status: "success",
    data: users,
  });
};
