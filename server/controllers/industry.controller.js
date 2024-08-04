import Industry from "../models/industry.model.js";
import handleError from "../errors/errorHandler.js";

// Create a new industry
export const createIndustry = async (req, res) => {
  try {
    const { name } = req.body;
    const industry = new Industry({ name, companyIds: [], subIndustryIds: [] });
    await industry.save();
    res.status(201).json(industry);
  } catch (error) {
    handleError(req, res, error, "Failed to create industry");
  }
};

// Get all industries
export const getIndustries = async (req, res) => {
  try {
    const industries = await Industry.find();
    res.status(200).json(industries);
  } catch (error) {
    handleError(req, res, error, "Failed to fetch industries");
  }
};

// Update an industry by ID
export const updateIndustryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const industry = await Industry.findByIdAndUpdate(
      id,
      { name, updatedAt: Date.now() },
      { new: true }
    );
    if (!industry) {
      return res.status(404).json({ message: "Industry not found" });
    }
    res.status(200).json(industry);
  } catch (error) {
    handleError(req, res, error, "Failed to update industry");
  }
};

// Delete an industry by ID
export const deleteIndustryById = async (req, res) => {
  try {
    const { id } = req.params;
    const industry = await Industry.findByIdAndDelete(id);
    if (!industry) {
      return res.status(404).json({ message: "Industry not found" });
    }
    res.status(200).json({ message: "Industry deleted successfully" });
  } catch (error) {
    handleError(req, res, error, "Failed to delete industry");
  }
};
