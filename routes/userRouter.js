const router = require("express").Router();
const userController = require("../controllers/userController");
const { admin } = require("../middleware/auth");

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router
  .get("/verify", userController.verifiedUser)
  .get("/", admin, userController.getUsers);

module.exports = router;
