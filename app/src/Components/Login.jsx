import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {};
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
                <Link to="/login">Don't have an account? signup</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Login;
