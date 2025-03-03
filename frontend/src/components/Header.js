import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Box, Button, Tabs, Tab, IconButton, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';

const Header = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0); 
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const user = useSelector(state => state.user);

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('userId');
    if (loggedInUserId && !isLoggedIn) {
      dispatch(authActions.login({ _id: loggedInUserId }));
    }
  }, [dispatch, isLoggedIn]);

  const getInitials = (name) => {
    if (!name) return '';
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials.substring(0, 2).toUpperCase();
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position='sticky' sx={{
        background: "linear-gradient(90deg, rgba(14,14,14,1) 0%, rgba(191,29,253,1) 33%, rgba(91,191,183,1) 68%, rgba(252,69,127,1) 100%)"
      }}>
        <Toolbar>
          <IconButton
            component={Link}
            to={isLoggedIn ? '/blogs' : '/'}
            sx={{
              color: 'white',
              fontWeight: 'bolder',
              transition: 'color 0.3s, transform 0.3s',
              ":hover": { color: 'aqua', transform: 'scale(1.1)', transition: 'color 0.3s, transform 0.3s' }
            }}
            variant="h1"
          >
            BLOGGY
          </IconButton>

          {isLoggedIn && (
            <Box display={'flex'} marginLeft={'auto'}>
              <Tabs textColor='inherit' value={value} onChange={handleTabChange}>
                <Tab component={Link} to='/blogs' label="All Blogs" />
                <Tab component={Link} to='/myBlogs' label="My Blogs" />
                <Tab component={Link} to='/blogs/add' label="Add Blogs" />
              </Tabs>
            </Box>
          )}

          <Box display={'flex'} marginLeft={'auto'}>
            {!isLoggedIn ? (
              <>
                <Button component={Link} to='/signup' sx={{ margin: 1, borderRadius: 10 }} variant='contained' color='warning'>SignUp</Button>
                <Button component={Link} to='/auth' sx={{ margin: 1, borderRadius: 10 }} variant='contained' color='warning'>Login</Button>
              </>
            ) : (
              <>
                {user && user._id && (
                  <Avatar 
                    sx={{ 
                      bgcolor: 'primary.main', 
                      mr: 1, 
                      cursor: 'pointer', 
                      transition: 'transform 0.3s', 
                      ":hover": { transform: 'scale(1.1)' } 
                    }} 
                    component={Link} 
                    to={`/user-details/${user._id}`}
                  >
                    {getInitials(user.name)}
                  </Avatar>
                )}
                <Button onClick={() => dispatch(authActions.logout())} component={Link} to='/' sx={{ margin: 1, borderRadius: 10 }} variant='contained' color='warning'>Logout</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
