import express from "express";
import {
  singUp,
  login,
  loginFacebook,
  forgotPassword,
  changePassword,
} from "../controllers/authControllers.js";

const authRoutes = express.Router();

authRoutes.post("/sign-up", singUp);
authRoutes.post("/login", login);
authRoutes.post("/login-facebook", loginFacebook);
authRoutes.post("/forgot-password", forgotPassword);
authRoutes.post("/change-password", changePassword);

export default authRoutes;
