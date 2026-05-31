const errorHandler = (err, req, res, next) => {
  console.log("🔥 FULL ERROR:");
  console.log(err); // show full stack

  res.status(500).json({
    success: false,
    message: err.message,
    stack: err.stack, // IMPORTANT for debugging
  });
};

module.exports = errorHandler;