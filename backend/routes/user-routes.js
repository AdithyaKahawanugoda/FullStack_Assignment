const express = require("express");
const router = express.Router();
const { updateProfile } = require("../controllers/user-controller");
const { protectedUser } = require("../middlewares/auth-middleware");

router.route("/profile").patch(protectedUser, updateProfile);

module.exports = router;
