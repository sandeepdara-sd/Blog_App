import {React,useState} from 'react'
import {AppBar,Toolbar,Box,Button,Tabs,Tab, IconButton} from '@mui/material';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { authActions } from '../store';

const Header = () => {
    const dispatch = useDispatch();
    const [value, setvalue] = useState();
    const isLoggedIn = useSelector(state=> state.isLoggedIn)
  return (
    <div>
        <AppBar position='sticky' sx={{background: "linear-gradient(90deg, rgba(14,14,14,1) 0%, rgba(191,29,253,1) 33%, rgba(91,191,183,1) 68%, rgba(252,69,127,1) 100%)"}}>
        {/* <AppBar  position='sticky' sx={{boxShadow:'unset', background:'transparent'}}> */}
            <Toolbar>
            {!isLoggedIn && <IconButton sx={{color:'white',fontWeight:'bolder',transition: 'color 0.3s, transform 0.3s',":hover":{color:'aqua',transform:'scale(1.1)',transition: 'color 0.3s, transform 0.3s'}}} variant="h1" LinkComponent={Link} to='/' >BLOGGY</IconButton>}
            {isLoggedIn && <IconButton sx={{color:'white',fontWeight:'bolder',transition: 'color 0.3s, transform 0.3s',":hover":{color:'aqua',transform:'scale(1.1)',transition: 'color 0.3s, transform 0.3s'}}} variant="h1" LinkComponent={Link} to='/blogs' >BLOGGY</IconButton>}
                
                {isLoggedIn &&
                <Box display={'flex'} marginLeft={'auto'} marginRight={'auto'}>
                    <Tabs textColor='inherit' value={value} onChange={(e,val)=>setvalue(val)}>
                        <Tab LinkComponent={Link} to='/blogs' label="All Blogs"/>
                        <Tab LinkComponent={Link} to='/myBlogs' label="My Blogs"/>
                        <Tab LinkComponent={Link} to='/blogs/add' label="Add Blogs"/>
                    </Tabs>
                </Box>
                }   
                <Box display={'flex'} marginLeft={'auto'} >
                {!isLoggedIn && 
                <>
                    
                    <Button LinkComponent={Link} to='/signup' sx={{margin:1, borderRadius:10}} variant='contained'  color='warning'>SignUp</Button>
                    <Button LinkComponent={Link} to='/auth' sx={{margin:1, borderRadius:10}} variant='contained'  color='warning'>Login</Button>
                    </> 
                }
                    {isLoggedIn && 
                    <Button onClick={()=>dispatch(authActions.logout())} LinkComponent={Link} to='/' sx={{margin:1, borderRadius:10}} variant='contained'  color='warning'>Logout</Button>
                }
                </Box>
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Header