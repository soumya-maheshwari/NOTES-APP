require("dotenv").config();
const Note = require("../models/noteModel");
const { ErrorHandler } = require("../middlewares/ErrorHandler");

const createNote = async (req, res, next) => {
  try {
    const user = req.user;
    const userid = user._id;

    const { title, content } = req.body;

    if (!title || !content) {
      next(new ErrorHandler(400, "Enter all the fields"));
    }

    const newNote = new Note({
      title,
      content,
      user: userid,
    });
    await newNote.save();
    // console.log(newNote);
    return res.status(200).json({
      newNote,
      msg: "Note created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllNotes = async (req, res, next) => {
  try {
    const user = req.user;
    const userid = user._id;
    // console.log(userid);
    const allNotes = await Note.find({ user: userid });

    // console.log(allNotes);
    res.status(200).json({
      allNotes,
      success: true,
      msg: "Notes fetched successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const editNote = async (req, res, next) => {
  try {
    // const noteId = req.params.id;
    // console.log(noteId);
    // const note = await Note.findById(noteId);
    // if (!note) {
    //   next(new ErrorHandler(400, "No not available for this id"));
    // }

    const { noteID, title, content } = req.body;

    if (!noteID) {
      next(new ErrorHandler(400, "id is required"));
    }
    const note = await Note.findById(noteID);
    if (!note) {
      next(new ErrorHandler(400, "No not available for this id"));
    }
    note.title = title;
    note.content = content;
    await note.save();
    return res.status(200).json({
      message: "Note updated successfully",
      note,
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const noteId = req.params.id;
    // console.log(noteId);
    if (!noteId) {
      next(new ErrorHandler(400, "No note available for this id"));
    }
    await Note.findByIdAndDelete(noteId);
    return res.status(200).json({
      msg: "Note deleted ",
      success: true,
      noteId,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  createNote,
  getAllNotes,
  editNote,
  deleteNote,
};
