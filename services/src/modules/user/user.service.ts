import { User } from "../../entities/User.entity.js";
import { GoogleUserData } from "../../types/google.js";
import { AppDataSource } from "../../config/database.js";
import e from "cors";

class UserService {
  private userRepo = AppDataSource.getRepository(User);

  async findOrCreateUser(userData: GoogleUserData): Promise<User> {
    const existingUser = await this.userRepo.findOneBy({
      googleId: userData.googleId,
    });
    if (existingUser) {
      return existingUser;
    }
    const newUser = this.userRepo.create({
      googleId: userData.googleId,
      email: userData.email,
      name: userData.name,
      avatar: userData.avatar,
    });
    return await this.userRepo.save(newUser);
  }
}

export const userService = new UserService();
