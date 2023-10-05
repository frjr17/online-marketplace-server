import express from "express";
import type { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import createRouter from "express-file-routing";
import morgan from "morgan";
import { initializeState } from "./controllers";
import { seedDb } from "./seeders";

dotenv.config({ path: ".env.local" });

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));
app.use(initializeState);
mongoose.connect(process.env.MONGO_DB_KEY as string).then(async () => {
  await createRouter(app);
  app.listen(port, () => {
    // If you need to seed the database again...
    seedDb();
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});
