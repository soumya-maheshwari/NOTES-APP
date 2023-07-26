import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { Button, AppBar, Toolbar, Typography, Container } from "@mui/material";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
              <Button color="inherit">Logout</Button>
            ) : (
              <>
                <Link to="/login">
                  <Button color="inherit">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button color="inherit">Signup</Button>
                </Link>
              </>
            )}
          </Toolbar>{" "}
        </AppBar>

        <Container style={{ paddingTop: "20px" }}>
          <Routes>
            <Route path="/signup" exact element={<Signup />} />

            <Route path="/login" exact element={<Login />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
