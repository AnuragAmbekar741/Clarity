import { AppDataSource } from "../config/database.js";
import { User } from "../entities/User.entity.js";
import { NotFoundError, ValidationError } from "../utils/errors.js";

export class UserService {
  private get userRepository() {
    return AppDataSource.getRepository(User);
  }

  async createUser(data: {
    name: string;
    email: string;
    age: number;
  }): Promise<User> {
    // Validate age
    if (data.age < 0 || data.age > 150) {
      throw new ValidationError("Age must be between 0 and 150");
    }

    // Check if email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ValidationError("Email already exists");
    }

    // Create and save user
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  async getAllUsers(options?: {
    skip?: number;
    take?: number;
  }): Promise<{ users: User[]; total: number }> {
    const [users, total] = await this.userRepository.findAndCount({
      skip: options?.skip || 0,
      take: options?.take || 10,
      order: { createdAt: "DESC" },
    });

    return { users, total };
  }

  async updateUser(
    id: string,
    data: Partial<{ name: string; age: number; isActive: boolean }>,
  ): Promise<User> {
    const user = await this.getUserById(id);

    // Validate age if provided
    if (data.age !== undefined && (data.age < 0 || data.age > 150)) {
      throw new ValidationError("Age must be between 0 and 150");
    }

    // Update fields
    Object.assign(user, data);

    return await this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUserById(id);
    await this.userRepository.remove(user);
  }

  async findUsersByAge(minAge: number, maxAge: number): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder("user")
      .where("user.age >= :minAge", { minAge })
      .andWhere("user.age <= :maxAge", { maxAge })
      .andWhere("user.isActive = :isActive", { isActive: true })
      .orderBy("user.age", "ASC")
      .getMany();
  }
}
