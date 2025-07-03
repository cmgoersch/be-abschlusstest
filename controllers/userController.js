import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//createToken
const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

//isValidPassword
function isValidPassword(password) {
  // Mindestens 10 Zeichen, 1 Großbuchstabe, 1 Kleinbuchstabe, 1 Sonderzeichen
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{10,}$/.test(password);
}

//register
export const register = async (req, res) => {
  try {
    const { role, email, password, fullname, companyName, contactPerson } = req.body;

    if (!isValidPassword(password)) {
      return res.status(400).json({ message: "Passwortanforderungen nicht erfüllt." });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "E-Mail bereits vergeben." });

    const user = await User.create({
      role,
      email,
      password,
      fullname,
      companyName,
      contactPerson,
    });

    const token = createToken(user);
    res.cookie("token", token, { httpOnly: true, maxAge: 12 * 3600 * 1000 });

    res.status(201).json({ message: "Registrierung erfolgreich" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//login
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Ungültige Anmeldedaten" });
  }

  const token = createToken(user);
  res.cookie("token", token, { httpOnly: true, maxAge: 12 * 3600 * 1000 });

  res.json({ message: "Login erfolgreich" });
};