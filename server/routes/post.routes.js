import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import checkRole from "../middlewares/checkRole.js";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
import upload from "../middlewares/multerConfig.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  checkRole("jobgiver"),
  upload.single("post"),
  createPost
);
router.get("/", verifyToken, checkRole("jobgiver"), getPosts);
router.put("/:id", verifyToken, checkRole("jobgiver"), updatePost);
router.delete("/:id", verifyToken, checkRole("jobgiver"), deletePost);

export default router;
