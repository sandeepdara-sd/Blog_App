import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../store';
import { serverURL } from '../helper/Helper';
import Swal from 'sweetalert';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post(`${serverURL}/api/user/signup`, {
        name: input.name,
        email: input.email,
        password: input.password
      });
      const data = res.data;
      return data;
    } catch (err) {
      console.log(err);
      Swal("Error", err.response.data.message || "Something went wrong", "error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    sendRequest().then((data) => {
      if (data && data.user) {
        localStorage.setItem("userId", data.user._id);
        dispatch(authActions.login());
        navigate("/blogs");
        Swal("Success", "Signup successful", "success");
      }
    }).catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          boxShadow="10px 10px 20px #ccc"
          margin="auto"
          marginTop={5}
          borderRadius={5}
          maxWidth={400}  
          p={3}
          backgroundColor="white"
        >
          <Typography variant="h2" padding={3} textAlign="center">SignUp</Typography>
          <TextField required name="name" type="text" onChange={handleChange} value={input.name} margin="normal" placeholder="Name" fullWidth />
          <TextField required name="email" type="email" onChange={handleChange} value={input.email} margin="normal" placeholder="Email" fullWidth />
          <TextField required name="password" type="password" onChange={handleChange} value={input.password} margin="normal" placeholder="Password" fullWidth />
          <Button type="submit" color="warning" sx={{ borderRadius: 3, marginTop: 3 }} variant="contained">SignUp</Button>
          <Button sx={{ marginTop: 3, borderRadius: 3 }} LinkComponent={Link} to="/auth">Change to Login</Button>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
