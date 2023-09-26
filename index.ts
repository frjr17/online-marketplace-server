import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { seedProducts } from "./seeders/product";
import { seedDb } from "./seeders";

dotenv.config({ path: ".env.local" });

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server is running");
});

mongoose.connect(process.env.MONGO_DB_KEY as string).then(() => {
  app.listen(port, () => {
    // If you need to seed the database again...
    // seedDb();
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});
