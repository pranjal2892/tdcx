import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./LoginPage.css";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { saveUserData } from "../../redux/action" 
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigator = useNavigate();
  let dispatch = useDispatch();

  const Login = () => {
    const baseURL = `${process.env.REACT_APP_BASE_URL}/users/login`;
    axios.post(`${baseURL}`, {
        email: email,
        password: password,
      })
      .then((response) => {
        dispatch(saveUserData(response.data.message));
        navigator("/tasklist");
      });
    
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };


  return (
    <div className="login_card">
      <div
        style={{
          margin: "5px",
          fontSize: "20px",
          fontFamily: "sans-serif",
          color: "grey",
        }}
      >
        Login
      </div>
      <div>
        <TextField
          className="login_textfield"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          autoComplete="off"
          onChange={handleEmail}
          type="text"
          value={email}
          name="email"
          required
        />
      </div>
      <div>
        <TextField
          className="login_textfield"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          autoComplete="off"
          onChange={handlePassword}
          type="password"
          value={password}
          name="password"
          required
        />
      </div>
      <div>
        <Button className="login_textfield" variant="contained" onClick={Login}>
          Login
        </Button>
      </div>
    </div>
  );
}
