import express from "express";
import {
  getUserDb,
  getUserOrm,
  getUserOrmById,
  createUserOrm,
} from "../controllers/userControllers.js";
import { middlewareToken } from "../config/jwt.js";

const useRoutes = express.Router();

useRoutes.get("/get-user-db", getUserDb);
useRoutes.get("/get-users-orm", middlewareToken, getUserOrm);
useRoutes.get("/get-user-orm/:id", middlewareToken, getUserOrmById);
useRoutes.post("/create-user-orm", middlewareToken, createUserOrm);

export default useRoutes;
