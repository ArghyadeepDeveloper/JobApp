import handleError from "../errors/errorHandler.js";
import Admin from "../models/admin.model.js";
import JobApplier from "../models/jobAppliers.model.js";
import JobGiver from "../models/jobGiver.model.js";

const checkRole = (role) => {
  return async (req, res, next) => {
    try {
      let user;

      switch (role) {
        case "admin":
          user = await Admin.findById(req.user.id);
          break;
        case "jobgiver":
          user = await JobGiver.findById(req.user.id);
          break;
        case "jobseeker":
          user = await JobApplier.findById(req.user.id);
          break;
        default:
          return res.status(400).json({ message: "Invalid role specified." });
      }

      if (!user) {
        return res.status(403).json({
          message: "Access denied. User not found or not authorized.",
        });
      }

      req.userRole = role;
      next();
    } catch (error) {
      console.error("Role check error:", error);
      handleError(req, res, next, "Internal server error. Role check failed.");
    }
  };
};

export default checkRole;
