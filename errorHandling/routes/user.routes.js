const express = require('express');
const { signup, login, addProduct, getProduct } = require('../controllers/user.controllers');
const { authentication } = require('../middleware/auth');
const { handleErrors } = require("../errorhandler/errrorHandler")

const router = express.Router();

router.use((err, req, res, next) => {
    handleErrors(err, req, res, next);
});


// user Routes 

router.post('/signup', signup)
router.post('/login', login);
router.post('/addproduct', authentication, addProduct)
router.get("/getProduct", getProduct)

module.exports = { router };