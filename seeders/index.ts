import User from "../models/user";
import { seedUsers } from "./user";

const seedDb = async () => {
  await User.deleteMany();

  await seedUsers();
};
