const express = require("express");
const router = express.Router();
const {
  updateProfile,
  getUsers,
  getUserById,
  getUserEmail,
  getUserBySearchTerm,
} = require("../controllers/user-controller");

const {
  protectedUser,
  protectedAdmin,
} = require("../middlewares/auth-middleware");

router.route("/updateProfile").patch(protectedUser, updateProfile);
router.route("/getAll").get(protectedAdmin, getUsers);
router.route("/getById/:id").get(protectedAdmin, getUserById);
router.route("/getUserEmail").get(protectedUser, getUserEmail);
router.route("/search").get(protectedAdmin, getUserBySearchTerm);

module.exports = router;
