import { DataSource } from "typeorm";
import { User } from "../entities/User";

const dbUrl = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

export const AppDataSource = new DataSource({
  type: "postgres",
  url: dbUrl,
  synchronize: true, // use false + migrations in production
  entities: [User],
});
