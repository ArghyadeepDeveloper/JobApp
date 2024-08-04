import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import checkRoles from "../middlewares/checkRole.js";
import upload from "../middlewares/multerConfig.js";
import {
  createCompany,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
  uploadProfilePicture,
  uploadCoverPicture,
} from "../controllers/company.controller.js";

const router = express.Router();

router.post("", verifyToken, checkRoles("jobgiver"), createCompany);

router.get("/:id", verifyToken, checkRoles("jobgiver"), getCompanyById);
router.put("/:id", verifyToken, checkRoles("jobgiver"), updateCompanyById);
router.delete("/:id", verifyToken, checkRoles("jobgiver"), deleteCompanyById);

// New routes for uploading pictures
router.post(
  "/:id/profile-picture",
  verifyToken,
  checkRoles("jobgiver"),
  upload.single("profilePicture"),
  uploadProfilePicture
);
router.post(
  "/:id/cover-picture",
  verifyToken,
  checkRoles("jobgiver"),
  upload.single("coverPicture"),
  uploadCoverPicture
);

export default router;
