import express from "express";
import upload from "../utils/multer.js";
import { mediaCourseLecture } from "../controllers/media.controller.js";

const router = express.Router();

router.route("/upload-video").post(upload.single("file"), mediaCourseLecture)

export default router;