import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteThunk, editNoteThunk } from "../Redux/noteSlice";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

const NoteCard = ({ noteId, id, title, content }) => {
  const dispatch = useDispatch();

  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const [editID, setEditID] = useState("");
  const [deleteID, setDeleteID] = useState("");

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

  const handleClickOpen2 = () => {
    setDeleteID(id);
    console.log(deleteID);
    setOpen2(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };
  const handleClose2 = (value) => {
    setOpen2(false);
  };
  const handleEdit = (e) => {
    // e.preventDefault();
    dispatch(editNoteThunk(userData))
      .then((res) => {
        // console.log(res);

        return res;
      })
      .catch((err) => {
        // console.log(err);
        return err.response;
      });
  };

  const userData2 = {
    noteId: deleteID,
  };
  const handleDelete = (e) => {
    e.preventDefault();
    setDeleteID(id);

    console.log(deleteID, "delete id");
    dispatch(deleteNoteThunk(noteId))
      .then((res) => {
        console.log(res);

        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  };

  const handleCancelDelete = (e) => {
    e.preventDefault();

    setOpen2(false);
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
            <button className="delete-btn" onClick={handleClickOpen2}>
              delete
            </button>
            <Dialog open={open2} onClose={handleClose2}>
              <div className="dialog-class">
                <form className="form-class">
                  <label className="label-class">
                    Are you sure you want to delete this note?
                  </label>

                  <button type="submit" className="add" onClick={handleDelete}>
                    YES
                  </button>
                  <button
                    type="submit"
                    className="add"
                    onClick={handleCancelDelete}
                  >
                    NO
                  </button>
                </form>
              </div>
            </Dialog>
          </div>
          <h2 className="note-title">{title}</h2>
          <p className="note-content">{content}</p>
          <p>{id}</p>
        </div>
      </div>
    </>
  );
};

export default NoteCard;
