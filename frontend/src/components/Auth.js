import React, { Suspense, useState } from 'react'
import {TextField,Typography,Box,Button} from '@mui/material'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from './../store/index';
import {Link, useNavigate} from 'react-router-dom'

import Loading from './Loading'



const Auth = () => {
  const navigate  = useNavigate();
  const dispatch = useDispatch()
  const [input, setinput] = useState({
   
    email:"",
    password:""
  })
  

  const handleChange = (e)=>{
    setinput((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }

  const sendRequest = async (type="login") => {
    const res = await axios.post(`http://localhost:5000/api/user/${type}`,{
      
      email:input.email,
      password:input.password
    }).catch(err => console.log(err));

      const data  = await res.data;
      console.log(data);
      return data;
    
  }
  const handleSubmit =(e)=>{
    e.preventDefault()
    console.log(input);
    
      sendRequest().then((data)=>localStorage.setItem("userId",data.user._id))
      .then(()=>dispatch(authActions.login()))
      .then(()=>navigate("/blogs"))
      .then(data =>console.log(data))
    
   
  }
  return (
    <div>
      {/* <iframe src="https://vlipsy.com/embed/XL3yPtCl" width="640" height="360" frameborder="0">browser is not working</iframe> */}
      {/* <video  src='https://rr2---sn-a5meknzl.googlevideo.com/videoplayback?expire=1713318819&ei=QtceZt6DPPeq0u8PisKq2A8&ip=46.246.8.60&id=o-AIL-mq8pbHYxPbItEHLfi2SkCsR4j3wkyrwVYO4cEXeY&itag=299&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&vprv=1&svpuc=1&mime=video%2Fmp4&gir=yes&clen=11848836&dur=27.733&lmt=1665857311647381&keepalive=yes&c=IOS&txp=6219224&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgc69UJXiW2Di7TSdvyYH_efkXu42jL51hvwjBcW7VtO4CIQCnYiGZ993DOS2bf2SiJJ7N31Y3sFAoI_bBRol3bx4dSA%3D%3D&redirect_counter=1&cm2rm=sn-5gold7s&req_id=6e2e5897b0b7a3ee&cms_redirect=yes&cmsv=e&mh=YJ&mip=103.105.103.246&mm=34&mn=sn-a5meknzl&ms=ltu&mt=1713296593&mv=D&mvi=2&pl=0&lsparams=mh,mip,mm,mn,ms,mv,mvi,pl&lsig=ALClDIEwRQIgGRwZTfGiKNpbHDUl2WiUlgcE1rH32pieY2GEtphDeuQCIQCEMj05cDh83OT1gMQnSAB3hrmIdVJehBoZRnmM9qXM5Q%3D%3D' autoPlay loop muted></video> */}
      <Suspense fallback={<Loading/>}>

      
      <form onSubmit={handleSubmit}>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} boxShadow="10px 10px 20px #ccc" margin={'auto'} marginTop={5} borderRadius={5} maxWidth={400}>
          <Typography variant='h2' padding={3} textAlign={'center'}>Login</Typography>
          
         
          <TextField required name='email' type='email' onChange={handleChange} value={input.email} margin='normal' placeholder='Email'/>
          <TextField required name='password' type='password' onChange={handleChange} value={input.password} margin='normal' placeholder='Password'/>
          <Button type='submit' color='warning'sx={{borderRadius:3, marginTop:3}} variant='contained'>Login</Button>
          <Button sx={{marginTop:3, borderRadius:3}} LinkComponent={Link} to='/signup'  >change to signup</Button>
        </Box>
      </form>
      </Suspense>
    </div>
  )
}

export default Auth