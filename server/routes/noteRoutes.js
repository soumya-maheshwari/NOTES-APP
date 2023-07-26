const express = require("express");
const router = express.Router();
const { noteContoller } = require("../controllers");
const { authVerifyToken } = require("../middlewares/authVerifyToken");

router.post("/create_note", authVerifyToken, noteContoller.createNote);
router.get("/get_Note", authVerifyToken, noteContoller.getAllNotes);

module.exports = router;
