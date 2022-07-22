const NoteModel = require("../models/notes-model");

// add note
exports.addNote = async (req, res) => {
  const { title, description } = req.body;
  try {
    await NoteModel.create({
      title,
      description,
    });
    return res.status(201).json({ msg: "New note added" });
  } catch (error) {
    return res.status(500).json({
      msg: "Error in addNote controller-" + error,
    });
  }
};

// delete note by id
exports.deleteNoteById = async (req, res) => {
  const _id = req.params._id;
  try {
    await NoteModel.deleteOne({ _id: _id });
    return res.status(202).json({ msg: "Note deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      msg: "Error in deleteNoteById controller-" + error,
    });
  }
};

// update note by id
exports.updateNoteById = async (req, res) => {
  const noteData = req.body;
  try {
    if (!noteData._id) {
      return res.status(400).json({
        msg: "Can not find the note id",
      });
    } else {
      await NoteModel.findOneAndUpdate(
        { _id },
        {
          $set: noteData,
        }
      );
      return res.status(200).json({
        msg: "Note updated successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: "Error in updateNoteById controller-" + error,
    });
  }
};

// get all notes
exports.getNotes = async (req, res) => {
  try {
    const allNotes = await NoteModel.find();
    return res.status(200).send({
      allNotes,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error in getNotes controller-" + error,
    });
  }
};

// get notes by student id
exports.getNotesByStudentId = async (req, res) => {
  const student_id = req.params.sid;
  try {
    const notes = await NoteModel.find({ student_id });
    return res.status(200).json({
      notes,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error in getNotesByStudentId controller-" + error,
    });
  }
};
