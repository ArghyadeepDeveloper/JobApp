import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectToDatabase from "./database/connection.js";
import jobGiverRoutes from "./routes/jobGiver.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import companyRoutes from "./routes/company.routes.js";
import cityRoutes from "./routes/city.routes.js";
import industryRoutes from "./routes/industry.routes.js";

dotenv.config();

const app = express();
connectToDatabase();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "uploads")));
app.use("/employers", jobGiverRoutes);
app.use("/admin", adminRoutes);
app.use("/admin", cityRoutes);
app.use("/admin", industryRoutes);
app.use("/company", companyRoutes);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
