const Users = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = {
  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await Users.findOne({ email: email });
      //checking if User email exists
      if (user) return res.status(400).json({ msg: "Email Already Exists" });
      //Password Hashing
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        username: username,
        email: email,
        password: passwordHash,
      });

      await newUser.save();
      res.json({ msg: "Sign up Success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email: email });
      //check if email exists in MongoDB
      if (!user) return res.status(400).json({ msg: "User does not exist" });
      //comparing Passwords
      const matching = await bcrypt.compare(password, user.password);
      if (!matching) return res.status(400).json({ msg: "Incorrect Password" });
      //creating token
      const payload = { id: user._id, name: user.username };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });
      res.json({ token });
      res.json({ msg: "Login User" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  verifiedUser: (req, res) => {
    try {
      const token = req.header("Authorization");
      if (!token) return res.send(false);
      jwt.verify(token, process.env.JWT_SECRET, async (err, verified) => {
        if (err) return res.send(false);

        const user = await Users.findById(verified.id);
        if (!user) return res.send(false);

        return res.send(true);
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await Users.find({});
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userController;
