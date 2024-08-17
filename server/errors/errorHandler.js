const handleError = (req, res, err, message = "An error occurred") => {
  console.log("error is ", err);
  if (err.name === "ValidationError") {
    // Handle Mongoose validation errors
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: err.errors,
    });
  }

  if (err.name === "MongoServerError" && err.code === 11000) {
    // Handle duplicate key errors (e.g., unique constraint violations)
    const field = Object.keys(err.keyValue)[0]; // Get the field name
    return res.status(400).json({
      success: false,
      message: `This ${field} already exists.`,
      field: field,
      value: err.keyValue[field],
    });
  }

  if (err.name === "CastError") {
    // Handle invalid ObjectId errors
    return res.status(400).json({
      success: false,
      message: "Invalid data format",
      details: err.message,
    });
  }

  // Handle other types of errors
  res.status(500).json({
    success: false,
    message: message || "Internal Server Error",
  });
};

export default handleError;
