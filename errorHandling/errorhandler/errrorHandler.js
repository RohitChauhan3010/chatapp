const { logError } = require("../logger");

const handleErrors = (error, req, res, next) => {
  logError(error, req);
  return res.status(500).json({
    error: {
      message: error.message
      // stack: error.stack
    },
  });
};

module.exports = {
  handleErrors
};
