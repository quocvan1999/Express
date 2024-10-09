import express from "express";
import useRoutes from "./userRoutes.js";

const rootRoutes = express.Router();

rootRoutes.use("/user", useRoutes);

export default rootRoutes;
