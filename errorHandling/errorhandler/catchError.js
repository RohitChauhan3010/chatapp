// const fs = require('fs');
// const { handleErrors } = require('../errorhandler/errrorHandler');

// const logFile = 'catch.txt';

// const logError = (error) => {
//   fs.appendFileSync(logFile, `${new Date().toISOString()} - ${error}\n`);
// };

// const catchErrors = (req, res, next) => {
//   try {
//     if (!req.route) {
//       const error = `Route not defined for ${req.originalUrl}`;
//       logError(error);
//       return res.status(404).json({ error: 'Not Found' });
//     } else {
//         // Check if the route allows the HTTP method
//         const allowedMethods = req.route.methods;

//         const requestedMethod = req.method.toLowerCase();
//         console.log("hello",requestedMethod)
//       if (!allowedMethods[requestedMethod]) {
//         const error = `Invalid HTTP method ${requestedMethod} for ${req.originalUrl}`;
//         logError(error);
//         return res.status(405).json({ error: 'Method Not Allowed' });
//       } else {
//         next();
//       }
//     }
//   } catch (error) {
//     handleErrors(error, req, res, next);
//   }
// };

// module.exports = { catchErrors };
