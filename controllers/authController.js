const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Email Already exists",
      });
    }

    let salt = bcrypt.genSaltSync(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const user = new userModel(req.body);
    await user.save();
    return res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log("ERROR line 27", error);
    res.status(500).send({
      success: false,
      message: "Error in register",
    });
  }
};

//LOGIN CALLBACK
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    //check roal
    if (user.role !== req.body.role) {
      return res.status(500).send({
        success: false,
        message: "roal does not mathch",
      });
    }
    //COmpare Password
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log("line 75",error);
    res.status(500).send({
      success: false,
      message: "Error In Login API",
      error: error,
    });
  }
};

const currentUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    return res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log("line 93",error);
    return res.status(500).send({
      success: false,
      message: "Error in Current User Controller",
      error,
    });
  }
};

module.exports = { registerController, loginController, currentUserController };
