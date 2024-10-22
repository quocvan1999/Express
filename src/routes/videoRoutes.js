import express from "express";
import {
  getTypes,
  getVideo,
  getVideosTypeId,
  getVideoById,
} from "../controllers/videoControllers.js";
import { middlewareToken } from "../config/jwt.js";

const videoRoutes = express.Router();

videoRoutes.get("/get-videos", getVideo);
videoRoutes.get("/get-types", getTypes);
videoRoutes.get("/get-videos/:typeId", getVideosTypeId);
videoRoutes.get("/get-video/:videoId", getVideoById);

export default videoRoutes;
