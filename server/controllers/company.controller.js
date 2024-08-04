import Company from "../models/company.model.js";
import City from "../models/city.model.js";
import handleError from "../errors/errorHandler.js";
import Industry from "../models/industry.model.js";

// Create a new company
export const createCompany = async (req, res) => {
  console.log(req.body);
  try {
    const { name, address, city, website, industryId } = req.body;
    const createdBy = req.user.id;
    if (!name || !address || !city || !website || !industryId) {
      return res
        .status(400)
        .json({ success: false, message: "Not all data available" });
    }
    // Check if the city exists
    const cityExists = await City.findOne({ code: city });
    console.log(cityExists);
    if (!cityExists) {
      return res
        .status(400)
        .json({ success: false, message: "City does not exist" });
    }

    // Check if the industry exists
    const industryExists = await Industry.findById(industryId);
    if (!industryExists) {
      return res
        .status(400)
        .json({ success: false, message: "Industry does not exist" });
    }

    const company = new Company({
      name,
      address,
      city,
      website,
      createdBy,
      jobPosters: [req.user.id],
      industryId,
    });
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    handleError(req, res, error, "Failed to create company");
  }
};

// Update a company by ID
export const updateCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, city, website, industryId } = req.body;

    // Check if the city exists
    const cityExists = await City.findOne({ code: city });
    if (!cityExists) {
      return res
        .status(400)
        .json({ success: false, message: "City does not exist" });
    }

    // Check if the industry exists
    const industryExists = await Industry.findById(industryId);
    if (!industryExists) {
      return res
        .status(400)
        .json({ success: false, message: "Industry does not exist" });
    }

    const company = await Company.findByIdAndUpdate(
      id,
      { name, address, city, website, industryId, updatedAt: Date.now() },
      { new: true }
    );
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    handleError(req, res, error, "Failed to update company");
  }
};

// Delete a company by ID
export const deleteCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByIdAndDelete(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    handleError(req, res, error, "Failed to delete company");
  }
};

// Get a company by ID
export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id)
      .populate("jobPosters")
      .populate("followers")
      .populate("postedJobs")
      .populate("posts")
      .populate("reviews.userId")
      .populate("industryId");
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    console.log(error);
    handleError(req, res, error, "Failed to get company");
  }
};

// Get all companies
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find()
      .populate("jobPosters")
      .populate("followers")
      .populate("postedJobs")
      .populate("posts")
      .populate("reviews.userId")
      .populate("industryId");
    res.status(200).json(companies);
  } catch (error) {
    handleError(req, res, error, "Failed to get companies");
  }
};

export const uploadProfilePicture = async (req, res) => {
  try {
    const { id } = req.params;
    const profilePictureURL = req.file.filename;

    const company = await Company.findByIdAndUpdate(
      id,
      { profilePictureURL, updatedAt: Date.now() },
      { new: true }
    );
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json(company);
  } catch (error) {
    handleError(req, res, error, "Failed to upload profile picture");
  }
};

// Upload cover picture
export const uploadCoverPicture = async (req, res) => {
  try {
    const { id } = req.params;
    const coverPictureURL = req.file.filename;

    const company = await Company.findByIdAndUpdate(
      id,
      { coverPictureURL, updatedAt: Date.now() },
      { new: true }
    );
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json(company);
  } catch (error) {
    handleError(req, res, error, "Failed to upload cover picture");
  }
};
