import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

module.exports = (req, res, next)=>{
  const token = req.cookies.token;
  if (!token) return res.status(401).json({error: "Access denied"});

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
} catch {
 res.status(401).json({error: 'Invalid token'}); 
}
};

// const createToken = (user) => {
//   return jwt.sign(
//     {
//       id: user._id,
//       role: user.role,
//     },
//     process.env.JWT_SECRET,
//     { expiresIn: "12h" }
//   );
// }