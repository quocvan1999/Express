import express from "express";
import {
  getUserDb,
  getUserOrm,
  getUserOrmById,
  createUserOrm,
} from "../controllers/userControllers.js";

const useRoutes = express.Router();

useRoutes.get("/get-user-db", getUserDb);

useRoutes.get("/get-users-orm", getUserOrm);
useRoutes.get("/get-user-orm/:id", getUserOrmById);
useRoutes.post("/create-user-orm", createUserOrm);

export default useRoutes;
