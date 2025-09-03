import React, { Suspense, useState } from 'react';
import { 
  TextField, 
  Typography, 
  Box, 
  Button, 
  Container,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  PersonAdd as PersonAddIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { Link, useNavigate } from 'react-router-dom';
import { serverURL } from '../helper/Helper';
import Loading from './Loading';
import Swal from 'sweetalert';

// Styled Components - Enhanced
const AuthContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  backgroundSize: '200% 200%',
  animation: 'gradientShift 8s ease infinite',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.4,
    animation: 'float 20s ease-in-out infinite',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
    transform: 'translate(-50%, -50%)',
    animation: 'pulse 6s ease-in-out infinite',
  },
}));

const AuthCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(30px)',
  borderRadius: theme.spacing(4),
  boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
  padding: theme.spacing(5),
  maxWidth: 500,
  width: '100%',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '5px',
    background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
    backgroundSize: '200% 100%',
    animation: 'gradientShift 3s ease infinite',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    right: '-100px',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
    transform: 'translateY(-50%)',
    animation: 'float 15s ease-in-out infinite',
    pointerEvents: 'none',
  },
}));

const AuthTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 900,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(135deg, #667eea, #764ba2)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontFamily: "'Outfit', sans-serif",
  letterSpacing: '-0.02em',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}));

const AuthSubtitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(5),
  fontSize: '1.125rem',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontWeight: 500,
  lineHeight: 1.6,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(2.5),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: '2px solid transparent',
    transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    fontSize: '1.1rem',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      borderColor: 'rgba(102, 126, 234, 0.4)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
    },
    '&.Mui-focused': {
      backgroundColor: 'white',
      borderColor: '#667eea',
      boxShadow: '0 0 0 4px rgba(102, 126, 234, 0.15)',
      transform: 'scale(1.02)',
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    fontWeight: 600,
    fontSize: '1rem',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#667eea',
    fontWeight: 700,
  },
}));

const SignupButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea, #764ba2)',
  color: 'white',
  padding: theme.spacing(2, 5),
  borderRadius: theme.spacing(3),
  fontSize: '1.2rem',
  fontWeight: 700,
  textTransform: 'none',
  boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
  transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  width: '100%',
  marginBottom: theme.spacing(4),
  fontFamily: "'Outfit', sans-serif",
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
    transition: 'left 0.8s ease',
  },
  '&:hover': {
    background: 'linear-gradient(135deg, #5a6fd8, #6a4190)',
    transform: 'translateY(-3px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(102, 126, 234, 0.5)',
    '&::before': {
      left: '100%',
    },
  },
  '&:disabled': {
    background: theme.palette.grey[400],
    transform: 'none',
    boxShadow: 'none',
  },
}));

const LoginLinkButton = styled(Button)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  color: '#667eea',
  border: '2px solid #667eea',
  padding: theme.spacing(2, 5),
  borderRadius: theme.spacing(3),
  fontSize: '1.1rem',
  fontWeight: 700,
  textTransform: 'none',
  transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  width: '100%',
  backdropFilter: 'blur(10px)',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  cursor: 'pointer',
  position: 'relative',
  zIndex: 1,
  '&:hover': {
    background: '#667eea',
    color: 'white',
    transform: 'translateY(-2px) scale(1.02)',
    boxShadow: '0 15px 35px rgba(102, 126, 234, 0.3)',
  },
}));

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post(`${serverURL}/api/user/signup`, {
        name: input.name,
        email: input.email,
        password: input.password
      });
      const data = res.data;
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      const errorMessage = err.response?.data?.message || "Something went wrong";
      setError(errorMessage);
      Swal("Error", errorMessage, "error");
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Signup form submitted', input);
    
    // Basic validation
    if (!input.name || !input.email || !input.password) {
      setError("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    setError("");

    try {
      const data = await sendRequest();
      if (data && data.user) {
        localStorage.setItem("userId", data.user._id);
        dispatch(authActions.login(data.user));
        navigate("/blogs");
        Swal("Success", "Signup successful", "success");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer maxWidth={false} sx={{marginTop: "-15px"}}>
      <Suspense fallback={<Loading />}>
        <AuthCard elevation={0} className="bounce-in">
          {/* Header */}
          <Box textAlign="center" mb={5}>
            <AuthTitle variant="h1">
              Join BLOGGY
            </AuthTitle>
            <AuthSubtitle variant="body1">
              Create your account and start sharing your stories with the world
            </AuthSubtitle>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 4, borderRadius: 3, fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="slide-up">
              {error}
            </Alert>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit}>
            <StyledTextField
              required
              name="name"
              type="text"
              onChange={handleChange}
              value={input.name}
              placeholder="Enter your full name"
              fullWidth
              className="slide-up"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" sx={{ fontSize: '1.5rem' }} />
                  </InputAdornment>
                ),
              }}
            />

            <StyledTextField
              required
              name="email"
              type="email"
              onChange={handleChange}
              value={input.email}
              placeholder="Enter your email address"
              fullWidth
              className="slide-up"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" sx={{ fontSize: '1.5rem' }} />
                  </InputAdornment>
                ),
              }}
            />

            <StyledTextField
              required
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              value={input.password}
              placeholder="Create a strong password"
              fullWidth
              className="slide-up"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" sx={{ fontSize: '1.5rem' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      size="large"
                      sx={{ 
                        color: 'action.active',
                        '&:hover': { 
                          color: 'primary.main',
                          transform: 'scale(1.1)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <SignupButton
              type="submit"
              variant="contained"
              disabled={isLoading}
              startIcon={isLoading ? null : <PersonAddIcon />}
              className="slide-up"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </SignupButton>
          </form>

          {/* Divider */}
          <Divider sx={{ my: 4 }} className="fade-in">
            <Typography variant="body2" color="text.secondary" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600">
              Already have an account?
            </Typography>
          </Divider>

          {/* Login Link */}
          <LoginLinkButton
            onClick={() => {
              console.log('Navigating to auth');
              navigate('/auth');
            }}
            startIcon={<ArrowForwardIcon />}
            className="slide-up"
          >
            Sign In Instead
          </LoginLinkButton>

          {/* Footer */}
          <Box mt={5} textAlign="center">
            <Typography variant="caption" color="text.secondary" fontFamily="'Plus Jakarta Sans', sans-serif" sx={{ opacity: 0.8 }}>
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </Typography>
          </Box>
        </AuthCard>
      </Suspense>
    </AuthContainer>
  );
};

export default Signup;
