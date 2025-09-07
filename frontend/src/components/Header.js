import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Box, Button, Tabs, Tab, IconButton, Avatar, Typography, Container } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';
import { styled } from '@mui/material/styles';
import { 
  Home as HomeIcon, 
  Article as ArticleIcon, 
  Add as AddIcon, 
  Logout as LogoutIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon
} from '@mui/icons-material';

// Styled Components - Enhanced
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  backgroundSize: '200% 200%',
  animation: 'gradientShift 8s ease infinite',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
  backdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.appBar,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.5,
    animation: 'float 20s ease-in-out infinite',
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: '80px',
  padding: theme.spacing(0, 3),
  position: 'relative',
  zIndex: 10,
}));

const LogoButton = styled(IconButton)(({ theme }) => ({
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.spacing(3),
  transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(1.1) rotate(2deg)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTab-root': {
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: 600,
    fontSize: '1rem',
    textTransform: 'none',
    minHeight: '56px',
    padding: theme.spacing(1.5, 3),
    borderRadius: theme.spacing(2),
    transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
      transition: 'left 0.6s ease',
    },
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      color: 'white',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
      '&::before': {
        left: '100%',
      },
    },
    '&.Mui-selected': {
      color: 'white',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
    },
  },
  '& .MuiTabs-indicator': {
    backgroundColor: 'white',
    height: '4px',
    borderRadius: '2px',
    boxShadow: '0 2px 8px rgba(255, 255, 255, 0.3)',
  },
}));

const StyledButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(1.5, 4),
  fontWeight: 700,
  textTransform: 'none',
  fontSize: '1rem',
  transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.6s ease',
  },
  ...(variant === 'primary' && {
    background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
    color: 'white',
    boxShadow: '0 8px 25px rgba(238, 90, 36, 0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #ee5a24, #d63031)',
      transform: 'translateY(-3px) scale(1.05)',
      boxShadow: '0 20px 40px rgba(238, 90, 36, 0.4)',
      '&::before': {
        left: '100%',
      },
    },
  }),
  ...(variant === 'secondary' && {
    background: 'rgba(255, 255, 255, 0.15)',
    color: 'white',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.25)',
      borderColor: 'rgba(255, 255, 255, 0.5)',
      transform: 'translateY(-2px) scale(1.05)',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
      '&::before': {
        left: '100%',
      },
    },
  }),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 48,
  height: 48,
  cursor: 'pointer',
  transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  border: '3px solid rgba(255, 255, 255, 0.3)',
  background: 'linear-gradient(135deg, #667eea, #764ba2)',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  '&:hover': {
    transform: 'scale(1.15) rotate(5deg)',
    borderColor: 'rgba(255, 255, 255, 0.6)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  },
}));

const Header = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const user = useSelector(state => state.user);
  const location = useLocation();

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('userId');
    if (loggedInUserId && !isLoggedIn) {
      dispatch(authActions.login({ _id: loggedInUserId }));
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    // Set active tab based on current location
    const path = location.pathname;
    if (path === '/blogs') setValue(0);
    else if (path === '/myBlogs') setValue(1);
    else if (path === '/blogs/add') setValue(2);
  }, [location]);

  const getInitials = (name) => {
    if (!name) return 'U';
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials.substring(0, 2).toUpperCase();
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate  = useNavigate();
  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/", { replace: true });
  };

  return (
    <StyledAppBar>
      <StyledToolbar>
        <Container maxWidth="xl">
          <Box display="flex" alignItems="center" justifyContent="space-between">
            {/* Logo */}
            <LogoButton
              component={Link}
              to={isLoggedIn ? '/blogs' : '/'}
              sx={{ mr: 3 }}
              className="bounce-in"
            >
              <Typography variant="h5" fontWeight="900" fontFamily="'Outfit', sans-serif">
                BLOGGY
              </Typography>
            </LogoButton>

            {/* Navigation Tabs */}
            {isLoggedIn && (
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                <StyledTabs 
                  value={value} 
                  onChange={handleTabChange}
                  sx={{ 
                    '& .MuiTabs-flexContainer': { 
                      gap: 2 
                    } 
                  }}
                >
                  <Tab 
                    component={Link} 
                    to="/blogs" 
                    label={
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <HomeIcon fontSize="medium" />
                        All Blogs
                      </Box>
                    }
                    className="slide-left"
                  />
                  <Tab 
                    component={Link} 
                    to="/myBlogs" 
                    label={
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <ArticleIcon fontSize="medium" />
                        My Blogs
                      </Box>
                    }
                    className="slide-up"
                  />
                  <Tab 
                    component={Link} 
                    to="/blogs/add" 
                    label={
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <AddIcon fontSize="medium" />
                        Add Blog
                      </Box>
                    }
                    className="slide-right"
                  />
                </StyledTabs>
              </Box>
            )}

            {/* Auth Buttons / User Menu */}
            <Box display="flex" alignItems="center" gap={2}>
              {!isLoggedIn ? (
                <>
                  <StyledButton
                    component={Link}
                    to="/signup"
                    variant="primary"
                    startIcon={<PersonAddIcon />}
                    className="fade-in-scale"
                  >
                    Sign Up
                  </StyledButton>
                  <StyledButton
                    component={Link}
                    to="/auth"
                    variant="secondary"
                    startIcon={<LoginIcon />}
                    className="fade-in-scale"
                  >
                    Login
                  </StyledButton>
                </>
              ) : (
                <>
                  {user && user._id && (
                    <StyledAvatar 
                      component={Link} 
                      to={`/user-details/${user._id}`}
                      sx={{ 
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                      }}
                      className="bounce-in"
                      title={user.name || 'User'}
                    >
                      {user.name ? getInitials(user.name) : 'U'}
                    </StyledAvatar>
                  )}
                  <StyledButton
                    onClick={handleLogout}
                    variant="secondary"
                    startIcon={<LogoutIcon />}
                    className="fade-in-scale"
                  >
                    Logout
                  </StyledButton>
                </>
              )}
            </Box>
          </Box>
        </Container>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
