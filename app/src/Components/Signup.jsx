import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import { registerUser } from "../Redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();
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
    dispatch(registerUser(userData))
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
      <Container component="main" maxWidth="xs">
        <div>
          <Typography
            component="h1"
            variant="h4"
            textAlign={"center"}
            marginTop={"10vh"}
          >
            {" "}
            SIGNUP
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
              Sign Up
            </Button>
            <Grid container>
              <Grid item className="link">
                <Link to="/login">Already have an account? logIn</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Signup;
