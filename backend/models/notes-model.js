const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    uppercase: true,
  },
  description: {
    type: String,
    lowercase: true,
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

const Note = mongoose.model("note", NoteSchema);

module.exports = Note;
