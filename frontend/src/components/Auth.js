import React, { Suspense, useState } from 'react';
import { TextField, Typography, Box, Button, Grid } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from './../store/index';
import { Link, useNavigate } from 'react-router-dom';
import { serverURL } from '../helper/Helper';
import Loading from './Loading';
import Swal from 'sweetalert';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const sendRequest = async (type = "login") => {
    try {
      const res = await axios.post(`${serverURL}/api/user/${type}`, {
        email: input.email,
        password: input.password
      });

      const data = res.data;
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      Swal("Error", err.response.data.message || "Something went wrong", "error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => {
        if (data && data.user) {
          localStorage.setItem("userId", data.user._id);
          dispatch(authActions.login());
          navigate("/blogs");
          Swal("Success", "Login successful", "success");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: 'auto' }}>
      <Suspense fallback={<Loading />}>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{ backgroundColor: 'white' }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            boxShadow="10px 10px 20px #ccc"
            margin="auto"
            marginTop={5}
            borderRadius={5}
            width={350}  
            p={3}
          >
            <Typography variant="h2" padding={3} textAlign="center">Login</Typography>
            <TextField required name="email" type="email" onChange={handleChange} value={input.email} margin="normal" placeholder="Email" fullWidth />
            <TextField required name="password" type="password" onChange={handleChange} value={input.password} margin="normal" placeholder="Password" fullWidth />
            <Button type="submit" color="warning" sx={{ borderRadius: 3, marginTop: 3 }} variant="contained">Login</Button>
            <Button sx={{ marginTop: 3, borderRadius: 3 }} LinkComponent={Link} to="/signup">Change to Signup</Button>
          </Box>
        </form>
      </Suspense>
    </Grid>
  );
};

export default Auth;
