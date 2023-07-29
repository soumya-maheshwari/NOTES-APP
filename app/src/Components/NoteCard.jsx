import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteThunk, editNoteThunk } from "../Redux/noteSlice";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import edit from ".././Assets/edit.svg";
import del from ".././Assets/bin.svg";

function getRandomRgb() {
  var num = Math.round(0xffffff * Math.random());
  var r = num >> 16;
  var g = (num >> 8) & 255;
  var b = num & 255;
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

for (var i = 0; i < 10; i++) {
  console.log(getRandomRgb());
}

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
    e.preventDefault();
    dispatch(editNoteThunk(userData)).then((res) => {
      console.log(res);
      if (res.payload.data.success) {
        toast.success(`${res.payload.data.message}`, {
          position: "top-right",
          // theme: "DARK",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      setOpen(false);
      return res;
    });
  };

  const userData2 = {
    noteId: deleteID,
  };
  const handleDelete = (e) => {
    e.preventDefault();
    setDeleteID(id);

    // console.log(deleteID, "delete id");
    dispatch(deleteNoteThunk(noteId)).then((res) => {
      console.log(res);
      if (res.payload.data.success) {
        toast.success(`${res.payload.data.msg}`, {
          position: "top-right",
          // theme: "DARK",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      setOpen2(false);
      return res;
    });
  };

  const handleCancelDelete = (e) => {
    e.preventDefault();

    setOpen2(false);
  };
  return (
    <>
      <div className="all-notes">
        <div
          className="note-card"
          style={{
            borderTopWidth: "3px",
            // borderTop: "red",
            borderTop: `9px solid ${getRandomRgb()}`,
            // borderTop: `${getRandomRgb()}`,
          }}
        >
          <div className="btns">
            <button className="edit-btn" onClick={handleClickOpen}>
              <img src={edit} alt="edit" />
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
              <img src={del} alt="delete" />
            </button>
            <Dialog open={open2} onClose={handleClose2}>
              <div className="dialog-class">
                <form className="form-class">
                  <label className="label-class">
                    Are you sure you want to delete this note?
                  </label>

                  <div className="two-btns">
                    <button
                      type="submit"
                      className="add"
                      onClick={handleDelete}
                    >
                      YES
                    </button>
                    <button
                      type="submit"
                      className="add del"
                      onClick={handleCancelDelete}
                    >
                      NO
                    </button>
                  </div>
                </form>
              </div>
            </Dialog>
          </div>
          <h2 className="note-title">{title}</h2>
          <p className="note-content">{content}</p>
        </div>
      </div>
    </>
  );
};

export default NoteCard;
