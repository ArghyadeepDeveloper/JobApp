import handleError from "../errors/errorHandler.js";
import City from "../models/city.model.js";

// Create a new city
export const createCity = async (req, res) => {
  try {
    const { name, code } = req.body;
    const city = new City({ name, code });
    await city.save();
    res.status(201).json(city);
  } catch (error) {
    console.log(error);
    handleError(req, res, error, "Some error occured.");
  }
};

// Get all cities
export const getCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (error) {
    handleError(req, res, error, "Some error occured.");
  }
};

// Update a city by ID
export const updateCityById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code } = req.body;
    const city = await City.findByIdAndUpdate(
      id,
      { name, code, updatedAt: Date.now() },
      { new: true }
    );
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }
    res.status(200).json(city);
  } catch (error) {
    handleError(req, res, error, "Some error occured.");
  }
};

// Delete a city by ID
export const deleteCityById = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await City.findByIdAndDelete(id);
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }
    res.status(200).json({ message: "City deleted successfully" });
  } catch (error) {
    handleError(req, res, error, "Some error occured.");
  }
};
