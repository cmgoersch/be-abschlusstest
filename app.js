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


// app.post("/login", async (req, res) => {
//   const user = await User.findOne({
//     username: req.body.username,
//     password: req.body.password,
//   });

//   if (!user) {
//     res.status(401).send({ error: "Invalid username or password" });
//     return;
//   }

//   const token = createToken(user);
//   res.send({ user, token });
// });


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
