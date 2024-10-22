import express from "express";
import {
  singUp,
  login,
  loginFacebook,
  forgotPassword,
} from "../controllers/authControllers.js";

const authRoutes = express.Router();

authRoutes.post("/sign-up", singUp);
authRoutes.post("/login", login);
authRoutes.post("/login-facebook", loginFacebook);
authRoutes.post("/forgot-password", forgotPassword);

export default authRoutes;
