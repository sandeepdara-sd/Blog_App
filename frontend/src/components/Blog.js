import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Blog = ({title,description,imageURL,userName,isUser,id}) => {
    console.log(title,isUser);
    const navigate  = useNavigate()
    const handleEdit = (e)=>{
      navigate(`/myblogs/${id}`)
    }
    const deleteRequest = async()=>{
      const res = await axios.delete(`http://localhost:5000/api/blog/${id}`).catch(err=>console.log(err))
      const data = await res.data
      return data
    }
    const handleDelete = ()=>{
      deleteRequest().then(()=>navigate("/")).then(()=>navigate('/blogs'))
    }
  return (
    <div>
      {" "}
        <Card sx={{ width: "40%",margin:"auto",mt:2,padding:2,boxShadow:"5px 5px 10px #ccc", ":hover":{
            boxShadow:"10px 10px 20px #ccc"
        } }}>
          {isUser && (
            <Box display={'flex'} >
              <IconButton onClick={handleEdit} sx={{marginLeft:'auto'}}>
              
                <ModeEditOutlineIcon color='warning' />
              </IconButton>
              <IconButton onClick={handleDelete}>
                <DeleteIcon color='error'/>
              </IconButton>
            </Box>
          )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], textTransform:"uppercase" }} aria-label="recipe">
            {userName.charAt(0)}
          </Avatar>
        }
        
        title={title}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        width="194"
        sx={{objectFit:'contain'}}
        image={imageURL}
        alt="Paella dish"
      />
      <CardContent>
        <hr/>
        <br/>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
     
    </Card>
    </div>
  )
    
}

export default Blog