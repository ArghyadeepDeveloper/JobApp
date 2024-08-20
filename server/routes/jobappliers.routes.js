import express from "express";
import {
  register,
  login,
  editProfile,
  uploadProfilePic,
  uploadResume,
  getProfileDetails,
  editPersonalProfile,
  editCareerDetails,
} from "../controllers/jobappliers.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import checkRole from "../middlewares/checkRole.js";
import upload from "../middlewares/multerConfig.js";
import {
  applyToJob,
  cancelJobApplication,
} from "../controllers/job.controller.js";

const jobApplierRoutes = express.Router();

jobApplierRoutes.post("/register", register);
jobApplierRoutes.post("/login", login);
jobApplierRoutes.get(
  "/",
  verifyToken,
  checkRole("jobapplier"),
  getProfileDetails
);
jobApplierRoutes.put(
  "/profile/",
  verifyToken,
  checkRole("jobapplier"),
  editPersonalProfile
);
jobApplierRoutes.put(
  "/profile/professional/",
  verifyToken,
  checkRole("jobapplier"),
  editCareerDetails
);
jobApplierRoutes.post(
  "/profile/picture",
  verifyToken,
  checkRole("jobapplier"),
  upload.single("profilePic"),
  uploadProfilePic
);
jobApplierRoutes.post(
  "/profile/resume",
  verifyToken,
  checkRole("jobapplier"),
  upload.single("resume"),
  uploadResume
);
jobApplierRoutes.post(
  "/jobs/:id/apply",
  verifyToken,
  checkRole("jobapplier"),
  applyToJob
);
jobApplierRoutes.post(
  "/jobs/:id/cancel",
  verifyToken,
  checkRole("jobapplier"),
  cancelJobApplication
);

export default jobApplierRoutes;
