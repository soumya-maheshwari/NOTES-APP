const express = require("express");
const router = express.Router();
const { noteContoller } = require("../controllers");
const { authVerifyToken } = require("../middlewares/authVerifyToken");

router.post("/create_note", authVerifyToken, noteContoller.createNote);
router.get("/get_Notes", authVerifyToken, noteContoller.getAllNotes);
router.delete(
  "/delete_note/:id",
  //  authVerifyToken,
  noteContoller.deleteNote
);
router.post("/edit_note", authVerifyToken, noteContoller.editNote);

module.exports = router;
