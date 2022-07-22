const express = require("express");
const router = express.Router();
const {
  getNotes,
  addNote,
  updateNoteById,
  deleteNoteById,
  getNotesByStudentId,
} = require("../controllers/note-controller");

const { protectedStudent } = require("../middlewares/auth-middleware");

router.route("/add").post(protectedStudent, addNote);
router.route("/updateById").patch(protectedStudent, updateNoteById);
router.route("/getAll").get(protectedStudent, getNotes);
router.route("/deleteById/:_id").delete(protectedStudent, deleteNoteById);
router.route("/getByStudentId/:sid").get(protectedStudent, getNotesByStudentId);

module.exports = router;
