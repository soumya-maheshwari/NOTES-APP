import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, AppBar, Toolbar, Typography } from "@mui/material";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import NotePage from "./Components/NotePage";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("userInfo");
  const [open, setOpen] = React.useState(false);

  const handleClose = (value) => {
    setOpen(false);
  };

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
    // Add event listener for beforeunload
    // const handleBeforeUnload = () => {
    //   // Clear local storage here
    //   localStorage.clear();
    // };

    // window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener on component unmount
    // return () => {
    //   window.removeEventListener("beforeunload", handleBeforeUnload);
    // };
  }, [isLoggedIn]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    // return Navigate("/login");
  };
  const handleCancelLogout = (e) => {
    e.preventDefault();

    setOpen(false);
  };
  return (
    <>
      <BrowserRouter>
        <AppBar
          position="static"
          style={{
            backgroundColor: "gold",
            color: "black",
          }}
        >
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Notes App
            </Typography>
            {isLoggedIn ? (
              <>
                <Button color="inherit" onClick={handleClickOpen}>
                  Logout
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <div className="dialog-class">
                    <DialogTitle>Are you sure you want to Logout?</DialogTitle>
                    <form className="form-class">
                      {" "}
                      <div className="two-btns">
                        <button
                          type="submit"
                          className="add"
                          onClick={handleLogout}
                        >
                          YES
                        </button>
                        <button
                          type="submit"
                          className="add del"
                          onClick={handleCancelLogout}
                        >
                          NO
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    color="inherit"
                    style={{ color: "black", fontSize: "21PX" }}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    color="inherit"
                    style={{ color: "black", fontSize: "21PX" }}
                  >
                    Signup
                  </Button>
                </Link>
              </>
            )}
          </Toolbar>{" "}
        </AppBar>

        <div style={{ marginTop: "5vh" }}>
          <Routes>
              
            <Route path="/" exact element={<Login />} />
            <Route path="/signup" exact element={<Signup />} />

            <Route path="/notePage" exact element={<NotePage />} />

            <Route path="/login" exact element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
