import express from "express";
import useRoutes from "./userRoutes.js";
import videoRouter from "./videoRoutes.js";
import authRoutes from "./authRoutes.js";

const rootRoutes = express.Router();

rootRoutes.use("/user", useRoutes);
rootRoutes.use("/video", videoRouter);
rootRoutes.use("/auth", authRoutes);

export default rootRoutes;
