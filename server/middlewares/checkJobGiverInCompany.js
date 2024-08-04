import Company from "../models/company.model.js";
import handleError from "../errors/errorHandler.js";

const checkJobGiverInCompany = async (req, res, next) => {
  try {
    const companyId = req.params.id;
    const jobGiverId = req.user.id;

    const company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    const jobGiverExists = company.jobPosters.includes(jobGiverId);
    if (!jobGiverExists) {
      return res
        .status(403)
        .json({ success: false, message: "JobGiver not authorized" });
    }

    next();
  } catch (error) {
    handleError(req, res, error, "Failed to check JobGiver in Company");
  }
};

export default checkJobGiverInCompany;
