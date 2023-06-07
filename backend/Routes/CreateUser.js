const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


router.post( //signup endpoint
  "/createuser",
  body("email", "incorrect email").isEmail(),
  body("name").isLength({ min: 3 }),
  body("password", "Not valid password.").isLength({ min: 8 }),
  async (req, res) => {
    const { name, password, email, location } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(7)
    const secPassword = await bcrypt.hash(password, salt)
    try {
      User.create({
        name: name,
        password: secPassword,
        email: email,
        location: location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
//login endpoint
router.post( "/loginuser",
  body("email", "incorrect email").isEmail(),
  body("password", "Not valid password.").isLength({ min: 8 }),
  async (req, res) => {

    const { password, email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "User not found." });
      }
      if(userData){
        console.log(userData);
        const pswdComparison = await bcrypt.compareSync(password, userData.password)
      if (!pswdComparison) {
        return res.status(400).json({ errors: "Enter correct credentials." });
      } 
        const data ={
          user: {
            email: userData.email,
            id:userData._id
          }
        }
        const jwtSecret = "Helloworldhelloall#"
        const authToken = jwt.sign(data,jwtSecret)
        console.log(authToken);
        return res.json({ success: true, authToken:authToken });
      
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({ success: false })
    }
  }
);

module.exports = router;
