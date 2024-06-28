import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const labelStyle = {mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}
const BlogDetail = () => {
  const navigate = useNavigate()
  const [input, setinput] = useState({
    
  })
  const handleChange=(e)=>{
    setinput((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const id= useParams().id;
  const [blog, setblogs] = useState()
  console.log(id);
  const fetchDetails = async()=>{
    const res = await axios.get(`http://localhost:5000/api/blog/${id}`).catch(err=>console.log(err))

    const data = await res.data
    return data
  }
  useEffect(()=>{
    fetchDetails().then(data=>
      {setblogs(data.blog)
       setinput({
        title:data.blog.title,
        description:data.blog.description,
        imageURL:data.blog.image,
       })
      });
  },[id])
  const sendRequest = async()=>{
    const res  = await axios.put(`http://localhost:5000/api/blog/update/${id}`,{
      title: input.title,
      description:input.description,
      
    }).catch(err=>console.log(err))

    const data = await res.data
    return data
  }
  console.log(blog);
  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(input);
    sendRequest().then(data =>console.log(data)).then(()=>navigate("/myblogs"));
    
    
  }
  return (
    <div>
      {input &&(
       <form onSubmit={handleSubmit}>
        <Box border={3} borderColor="linear-gradient(90deg, rgba(14,14,14,1) 0%, rgba(191,29,253,1) 33%, rgba(91,191,183,1) 68%, rgba(252,69,127,1) 100%)" borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={3} margin={"auto"} marginTop={3} display={'flex'} flexDirection={"column"} width={"80%"}>
          <Typography fontWeight={'bold'} padding={3} color={"grey"} variant='h2' textAlign={'center'}>
            Post your Blog
          </Typography>
          <InputLabel sx={labelStyle}>Title</InputLabel>
          <TextField name='title' onChange={handleChange} value={input.title} variant='outlined' margin='auto'/>
          <InputLabel sx={labelStyle}>Description</InputLabel>
          <TextField name='description' onChange={handleChange} value={input.description} variant='outlined' margin='auto'/>
          {/* <InputLabel sx={labelStyle}>ImageURL</InputLabel>
          <TextField name='imageURL' onChange={handleChange} value={input.imageURL} variant='outlined' margin='auto'/> */}
          <Button sx={{mt:2,borderRadius:4}} variant='contained' color='warning' type='submit'>Submit</Button>
        </Box>
      </form>
  )}
    </div>
  )
}

export default BlogDetail
