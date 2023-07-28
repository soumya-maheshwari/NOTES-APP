import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editNoteThunk } from "../Redux/noteSlice";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

const NoteCard = ({ id, title, content }) => {
  const dispatch = useDispatch();

  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [open, setOpen] = React.useState(true);
  const [editID, setEditID] = useState("");

  const userData = {
    title: editTitle,
    content: editContent,
    noteID: editID,
  };
  const handleClickOpen = () => {
    setEditID(id);
    setOpen(true);
    console.log(editID);
  };
  const handleClose = (value) => {
    setOpen(false);
  };
  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(editNoteThunk(userData))
      .then((res) => {
        console.log(res);

        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  };

  return (
    <>
      <div className="all-notes">
        <div className="note-card">
          <div className="btns">
            <button className="edit-btn" onClick={handleClickOpen}>
              edit
            </button>
            <Dialog open={open} onClose={handleClose}>
              <div className="dialog-class">
                <DialogTitle>EDIT NOTE</DialogTitle>
                <form className="form-class" onSubmit={handleEdit}>
                  <label className="label-class">Title</label>
                  <input
                    type="text"
                    id="input-class"
                    placeholder="Edit title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <label className="label-class">Description</label>
                  <textarea
                    id="desc-class"
                    rows={5}
                    placeholder="Edit description "
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  ></textarea>
                  <button type="submit" className="add">
                    EDIT
                  </button>
                </form>
              </div>
            </Dialog>
            <button className="delete-btn">delete</button>
          </div>
          <h2 className="note-title">{title}</h2>
          <p className="note-content">{content}</p>
          <p>{id}</p>
        </div>
        {/* <div className="note-card"> */}
        {/* <h2 className="note-title">{title}</h2>
        <p className="note-content">{content}</p> */}
      </div>
    </>
  );
};

export default NoteCard;
