import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

export const UserService = {
  signup: async (name: string, email: string, password: string, phone?: string) => {
    const repo = AppDataSource.getRepository(User);

    const existing = await repo.findOne({ where: { email } });
    if (existing) throw new Error("Email already registered");

    const hashed = await hashPassword(password);
    const user = repo.create({ name, email, password: hashed, phone });
    await repo.save(user);

    return { message: "Signup successful" };
  },

  login: async (email: string, password: string) => {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { email } });
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    const token = generateToken({ id: user.id, email: user.email });
    return { message: "Login successful", token, user };
  },
   getAllUsers: async () => {
    const repo = AppDataSource.getRepository(User);
    const users = await repo.find({
      select: ["id", "name", "email", "phone"], // exclude password
      order: { name: "ASC" },
    });
    return users;
  },
};
