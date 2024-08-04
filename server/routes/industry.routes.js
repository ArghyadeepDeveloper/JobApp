import express from "express";
import {
  createIndustry,
  getIndustries,
  updateIndustryById,
  deleteIndustryById,
} from "../controllers/industry.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import checkRole from "../middlewares/checkRole.js";

const indstryRoutes = express.Router();

indstryRoutes.post(
  "/industries",
  verifyToken,
  checkRole("admin"),
  createIndustry
);
indstryRoutes.get(
  "/industries",
  verifyToken,
  checkRole("admin"),
  getIndustries
);
indstryRoutes.put(
  "/industries/:id",
  verifyToken,
  checkRole("admin"),
  updateIndustryById
);
indstryRoutes.delete(
  "/industries/:id",
  verifyToken,
  checkRole("admin"),
  deleteIndustryById
);

export default indstryRoutes;
