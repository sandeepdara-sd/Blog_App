import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { serverURL } from '../helper/Helper';

import 'sweetalert2/dist/sweetalert2.css'; // Import SweetAlert2 CSS

const labelStyle = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' };

const BlogDetail = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: '',
    description: '',
    imageURL: '', // Adjust if needed
  });

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { id } = useParams();
  const [blog, setBlog] = useState();

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`${serverURL}/api/blog/${id}`);
      const data = res.data;
      return data.blog;
    } catch (error) {
      console.error('Error fetching blog details:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      if (data) {
        setBlog(data);
        setInput({
          title: data.title,
          description: data.description,
          imageURL: data.image, // Adjust according to your data structure
        });
      } else {
        console.log('Blog not found');
      }
    });
  }, [id]);

  const sendRequest = async () => {
    try {
      const res = await axios.put(`${serverURL}/api/blog/update/${id}`, {
        title: input.title,
        description: input.description,
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    sendRequest()
      .then((data) => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Blog Updated!',
          text: 'Your blog has been successfully updated.',
        }).then(() => navigate('/myblogs'));
      })
      .catch((error) => {
        console.error('Error updating blog:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please try again later.',
        });
      });
  };

  return (
    <div>
      {input && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="linear-gradient(90deg, rgba(14,14,14,1) 0%, rgba(191,29,253,1) 33%, rgba(91,191,183,1) 68%, rgba(252,69,127,1) 100%)"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin="auto"
            marginTop={3}
            display="flex"
            flexDirection="column"
            width="80%"
          >
            <Typography
              fontWeight="bold"
              padding={3}
              color="grey"
              variant="h2"
              textAlign="center"
            >
              Post your Blog
            </Typography>
            <InputLabel sx={labelStyle}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={input.title}
              variant="outlined"
              margin="auto"
            />
            <InputLabel sx={labelStyle}>Description</InputLabel>
            <TextField
              name="description"
              onChange={handleChange}
              value={input.description}
              variant="outlined"
              margin="auto"
            />
            {/* <InputLabel sx={labelStyle}>ImageURL</InputLabel>
            <TextField
              name="imageURL"
              onChange={handleChange}
              value={input.imageURL}
              variant="outlined"
              margin="auto"
            /> */}
            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="warning"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetail;
