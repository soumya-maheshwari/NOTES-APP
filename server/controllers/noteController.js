const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
    console.log(newNote);
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

    const allNotes = await Note.find({ user: userid });

    console.log(allNotes);
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
module.exports = {
  createNote,
  getAllNotes,
};
