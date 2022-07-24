const NoteModel = require("../models/notes-model");

// add note
exports.addNote = async (req, res) => {
  const { title, description } = req.body;
  const user_id = req.user._id;
  try {
    await NoteModel.create({
      title,
      description,
      student_id: user_id,
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
      const _id = noteData._id;
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
  const student_id = req.user._id;
  console.log(req.user.email);
  console.log(student_id);
  try {
    let query = NoteModel.find({ student_id });

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * pageSize;
    const total = await NoteModel.countDocuments({ student_id });

    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize);

    if (page > pages) {
      return res.status(404).json({
        msg: "No page found",
      });
    }

    const notes = await query;

    res.status(200).json({
      count: notes.length,
      page,
      pages,
      notes,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error in getNotes controller-" + error,
    });
  }
};
