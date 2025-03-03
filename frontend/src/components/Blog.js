import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import React from 'react';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { serverURL } from '../helper/Helper';

import 'sweetalert2/dist/sweetalert2.css'; // Import SweetAlert2 CSS

const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
    console.log(title, isUser);
    const navigate = useNavigate();
    
    const handleEdit = () => {
        navigate(`/myblogs/${id}`);
    };

    const deleteRequest = async () => {
        const res = await axios.delete(`${serverURL}/api/blog/${id}`).catch(err => console.log(err));
        const data = await res.data;
        return data;
    };

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this blog post!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteRequest()
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'Your blog post has been deleted.',
                            'success'
                        ).then(() => navigate('/blogs'));
                    })
                    .catch((error) => {
                        console.error('Error deleting blog:', error);
                        Swal.fire(
                            'Oops...',
                            'Something went wrong! Please try again later.',
                            'error'
                        );
                    });
            }
        });
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    const currentDate = formatDate(new Date());

    return (
        <div>
            <Card sx={{ width: "40%", margin: "auto", mt: 2, padding: 2, boxShadow: "5px 5px 10px #ccc", ":hover": { boxShadow: "10px 10px 20px #ccc" } }}>
                {isUser && (
                    <Box display={'flex'}>
                        <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto' }}>
                            <ModeEditOutlineIcon color='warning' />
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon color='error' />
                        </IconButton>
                    </Box>
                )}
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500], textTransform: "uppercase" }} aria-label="recipe">
                            {userName.charAt(0)}
                        </Avatar>
                    }
                    title={title}
                    subheader={currentDate}
                />
                <CardMedia
                    component="img"
                    height="194"
                    width="194"
                    sx={{ objectFit: 'contain' }}
                    image={imageURL}
                    alt="Blog Image"
                />
                <CardContent>
                    <hr />
                    <br />
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default Blog;
