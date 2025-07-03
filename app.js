// Viel Spaß!

import express from "express";
import cors from "cors";
import { connectToDB } from "./libs/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
dotenv.config();

await connectToDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/auth', userRoutes);
app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
