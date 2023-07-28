import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import { loginUser } from "../Redux/authSlice";

import * as ReactBootstrap from "react-bootstrap";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sm = useSelector((state) => state.auth);
  console.log(sm);

  useEffect(() => {
    setLoading(sm.isLoading);
  }, [sm]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const userData = {
    email,
    password,
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(userData))
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  };

  useEffect(() => {
    if (sm.isSuccess) {
      navigate("/notePage");

      localStorage.setItem("userInfo", JSON.stringify(sm.profile));
    }
  }, [sm]);

  return (
    <>
      {loading ? (
        <div className="loading">
          <ReactBootstrap.Spinner animation="border" className="spinner" />
        </div>
      ) : null}
      <Container component="main" maxWidth="xs">
        <div>
          <Typography
            component="h1"
            variant="h4"
            textAlign={"center"}
            marginTop={"10vh"}
          >
            LOGIN
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "gold",
                color: "black",
                marginTop: "4vh",
                marginBottom: "4vh",
                height: "50px",
              }}
            >
              LOGIN
            </Button>
            <Grid container>
              <Grid item className="link">
                <Link to="/signup">Don't have an account? signup</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Login;
