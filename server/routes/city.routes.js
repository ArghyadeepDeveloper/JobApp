import express from "express";
import {
  createCity,
  getCities,
  updateCityById,
  deleteCityById,
} from "../controllers/city.controllers.js";
import verifyToken from "../middlewares/verifyToken.js";
import checkRole from "../middlewares/checkRole.js";

const cityRoutes = express.Router();

cityRoutes.post("/cities", verifyToken, checkRole("admin"), createCity);
cityRoutes.get("/cities", getCities);
cityRoutes.put("/cities/:id", verifyToken, checkRole("admin"), updateCityById);
cityRoutes.delete(
  "/cities/:id",
  verifyToken,
  checkRole("admin"),
  deleteCityById
);

export default cityRoutes;
