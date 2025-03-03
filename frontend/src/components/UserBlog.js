import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Blog from './Blog';
import { serverURL } from '../helper/Helper';
import { Box, Typography } from '@mui/material';
import Swal from 'sweetalert2';

const UserBlog = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    try {
      const res = await axios.get(`${serverURL}/api/blog/user/${id}`);
      const data = await res.data;
      return data;
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while fetching your blogs!',
      });
      console.log(err);
    }
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {user && user.blogs && user.blogs.length > 0 ? (
        user.blogs.map((blog, index) => (
          <Blog
            key={blog._id}
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
          />
        ))
      ) : (
        <Box textAlign="center" mt={4}>
          <Typography variant="h4">No blogs available</Typography>
        </Box>
      )}
    </Box>
  );
};

export default UserBlog;
