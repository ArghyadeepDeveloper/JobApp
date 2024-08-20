import express from "express";
import {
  getAllJobApplications,
  loginJobGiver,
  registerJobGiver,
} from "../controllers/jobGiver.controller.js";
import checkRole from "../middlewares/checkRole.js";
import verifyToken from "../middlewares/verifyToken.js";

const jobGiverRoutes = express.Router();

jobGiverRoutes.post("/register", registerJobGiver);
jobGiverRoutes.post("/login", loginJobGiver);
jobGiverRoutes.get(
  "/jobs",
  verifyToken,
  checkRole("jobgiver"),
  getAllJobApplications
);

export default jobGiverRoutes;
