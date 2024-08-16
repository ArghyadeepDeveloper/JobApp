import express from "express";
import {
  addJob,
  getJobsByJobGiver,
  editJob,
  deleteJob,
  getJobsBySearchTerm,
} from "../controllers/job.controller.js";
import checkRole from "../middlewares/checkRole.js";
import verifyToken from "../middlewares/verifyToken.js";

const jobRoutes = express.Router();

jobRoutes.post("/", verifyToken, checkRole("jobgiver"), addJob);
jobRoutes.get("/", verifyToken, checkRole("jobgiver"), getJobsByJobGiver);
jobRoutes.put("/:jobId", verifyToken, checkRole("jobgiver"), editJob);
jobRoutes.delete("/:jobId", verifyToken, checkRole("jobgiver"), deleteJob);
jobRoutes.get(
  "/search/:searchTerm",
  verifyToken,
  checkRole("jobapplier"),
  getJobsBySearchTerm
);

export default jobRoutes;
