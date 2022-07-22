const express = require("express");
const router = express.Router();
const {
  updateProfile,
  getUsers,
  getUserById,
  getNotes,
  addNote,
  updateNoteById,
  deleteNoteById,
} = require("../controllers/user-controller");
const {
  protectedUser,
  protectedAdmin,
  protectedStudent,
} = require("../middlewares/auth-middleware");

router.route("/profile").patch(protectedUser, updateProfile);
router.route("/allUsers").get(protectedAdmin, getUsers);
router.route("/userById/:id").get(protectedAdmin, getUserById);
router.route("/note").post(protectedStudent, addNote);
router.route("/note").patch(protectedStudent, updateNoteById);
router.route("/notes").get(protectedStudent, getNotes);
router.route("/note/:_id").get(protectedStudent, deleteNoteById);

module.exports = router;
