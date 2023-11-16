const { UserModel } = require('../models/userModels');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { handleErrors } = require("../errorhandler/errrorHandler");
const { ProductModel } = require('../models/product');


// users signup/ Register
exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(401).json({
        status: false,
        msg: 'Password must contain at least one lowercase letter, one uppercase letter, and one digit.'
      });
    }

    if (password.length < 8) {
      return res.status(401).json({
        status: false,
        msg: 'Password must be at least 8 characters long.'
      });
    }

    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        msg: "Username is already taken"
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const newUser = new UsrModel({
      username,
      password: hashedPassword
    });

    await newUser.save();
    return res.status(201).json({
      status: true,
      msg: "User added successfully",
      newUser
    });
  } catch (error) {
    handleErrors(error, req, res);
  }
};


// users login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const checkUser = await UserModel.findOne({ username })
    if (!checkUser) {
      return res.status(401).json({
        status: false,
        msg: "user not found"
      })
    }
    const checkPassword = await bcrypt.compare(password, checkUser.password)
    if (!checkPassword) {
      return res.status(401).json({
        status: false,
        msg: "InValild Password"
      })
    }
    const token = jwt.sign({ userId: checkUser._id }, "secret_key", { noTimestamp: true, expiresIn: "1h" })

    res.status(201).json({
      status: true,
      msg: "login successfull",
      token
    })
  } catch (error) {
    handleErrors(error, req, res)
  }
}


// users add product by token(authorization)
exports.addProduct = async (req, res) => {
  try {
    const { productname } = req.body;

    const newProduct = new ProductModel({
      productname
    })
    await newProduct.save();
    return res.status(201).json({
      status: true,
      msg: "product added sucessfull",
      product: newProduct
    })
  } catch (error) {
    handleErrors(error, req, res)
  }
}

// user get product
exports.getProduct = async (req, res) => {
  try {
    const product = await ProductModel.find()

    return res.status(201).json({
      status: true,
      product: product
    })
  } catch (error) {
    handleErrors(error, req, res)
  }
}


