import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import NoteList from "./NoteList";
import NoteCard from "./NoteCard";
import { useDispatch, useSelector } from "react-redux";
import { addNoteThunk, getAllNotesThunk } from "../Redux/noteSlice";

const NotePage = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = React.useState(false);
  const [notes, setNotes] = useState([]);

  const sm = useSelector((state) => state.note);
  // console.log(sm);

  const user = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(user.accessToken);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  useEffect(() => {
    setNotes(sm.notes);
  }, [sm]);
  // console.log(notes, "notes");
  const userData = {
    title,
    content,
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    dispatch(addNoteThunk(userData))
      .then((res) => {
        // console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        // return err.response;
      });
  };

  useEffect(() => {
    dispatch(getAllNotesThunk())
      .then((res) => {
        // console.log(res);

        return res;
      })
      .catch((err) => {
        // console.log(err);
        return err.response;
      });
  }, []);

  return (
    <>
      {/* create note */}
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        // style={{
        //   alignItems: "center",
        //   position: "absolute",
        // }}
      >
        CREATE NEW NOTE
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <div className="dialog-class">
          <DialogTitle>CREATE NEW NOTE</DialogTitle>
          <form className="form-class" onSubmit={handleSubmit}>
            <label className="label-class">Title</label>
            <input
              type="text"
              id="input-class"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="label-class">Description</label>
            <textarea
              id="desc-class"
              rows={5}
              placeholder="Enter description "
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button type="submit" className="add">
              ADD
            </button>
          </form>
        </div>
      </Dialog>
      <NoteList notes={notes} />
    </>
  );
};

export default NotePage;
