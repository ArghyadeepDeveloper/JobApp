import handleError from "../errors/errorHandler.js";
import Industry from "../models/industry.model.js";

// Create a new industry
export const createIndustry = async (req, res) => {
  try {
    const { name, companyIds, subIndustryIds } = req.body;
    const industry = new Industry({ name, companyIds, subIndustryIds });
    await industry.save();
    res.status(201).json(industry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all industries
export const getIndustries = async (req, res) => {
  try {
    const industries = await Industry.find();
    res.status(200).json(industries);
  } catch (error) {
    handleError(req, res, error, "Some error occured");
  }
};

// Update an industry by ID
export const updateIndustryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, companyIds, subIndustryIds } = req.body;
    const industry = await Industry.findByIdAndUpdate(
      id,
      { name, companyIds, subIndustryIds, updatedAt: Date.now() },
      { new: true }
    );
    if (!industry) {
      return res.status(404).json({ message: "Industry not found" });
    }
    res.status(200).json(industry);
  } catch (error) {
    handleError(req, res, error, "Some error occured");
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
    handleError(req, res, error, "Some error occured");
  }
};
