const jwt = require("jsonwebtoken")
const { handleErrors } = require('../errorhandler/errrorHandler');

const authentication = async (req, res, next) => {
    try {
        const token = req.header("authorization");
        if (!token) {
            return res.status(401).json({
                status: false,
                msg: "token not found"
            })
        }
        const tokensecond = token && token.split(" ")[1]
        await jwt.verify(tokensecond, "secret_key", async (err, user) => {
            // console.log(err, user);
            if (err) return res.status(400).json({ message: err.message, status: false })
            else {
                console.log(user);
                next();
            }
        });
    } catch (error) {
        handleErrors(error, req, res)
    }
};

module.exports = { authentication };
