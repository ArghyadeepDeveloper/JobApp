import express from "express";
import {
  loginJobGiver,
  registerJobGiver,
} from "../controllers/jobGiver.controller.js";

const jobGiverRoutes = express.Router();

jobGiverRoutes.post("/register", registerJobGiver);
jobGiverRoutes.post("/login", loginJobGiver);

export default jobGiverRoutes;
