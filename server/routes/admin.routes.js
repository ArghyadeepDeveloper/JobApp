import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/admin.controller.js";

const adminRoutes = express.Router();

adminRoutes.post("/register", registerAdmin);
adminRoutes.post("/login", loginAdmin);

export default adminRoutes;
