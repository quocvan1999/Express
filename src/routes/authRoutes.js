import express from "express";
import {
  singUp,
  login,
  loginFacebook,
} from "../controllers/authControllers.js";

const authRoutes = express.Router();

authRoutes.post("/sign-up", singUp);
authRoutes.post("/login", login);
authRoutes.post("/login-facebook", loginFacebook);

export default authRoutes;
