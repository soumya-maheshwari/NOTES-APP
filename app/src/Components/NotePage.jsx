import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
const NotePage = () => {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  return (
    <>
      {/* create note */}
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{
          //   display: "flex",
          alignItems: "center",
          textAlign: "center",
          //   position: "absolute",
          left: "40vw",
        }}
      >
        CREATE NEW NOTE
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <div className="dialog-class">
          <DialogTitle>CREATE NEW NOTE</DialogTitle>
          <form className="form-class">
            <label className="label-class">Title</label>
            <input type="text" id="input-class" placeholder="Enter title" />
            <label className="label-class">Description</label>
            <textarea
              id="desc-class"
              rows={5}
              placeholder="Enter description "
            ></textarea>
            <button type="submit" className="add">
              ADD
            </button>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default NotePage;
