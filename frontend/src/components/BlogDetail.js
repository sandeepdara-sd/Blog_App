import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Paper,
  InputAdornment,
  Divider,
  Chip,
  Grid,
  Alert,
  CircularProgress,
  Avatar,
  Card,
  CardContent
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Title as TitleIcon,
  Description as DescriptionIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Image as ImageIcon,
  CheckCircle as CheckCircleIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { serverURL } from '../helper/Helper';

import 'sweetalert2/dist/sweetalert2.css';

// Styled Components - Enhanced
const EditContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'linear-gradient(135deg, #f5f7fa, #e4e9f7)',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const EditCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(20px)',
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: '800px',
  '& .bounce-in': {
    animation: 'bounceIn 0.8s ease-out',
  },
  '& .slide-up': {
    animation: 'slideUp 0.6s ease-out',
  },
  '@keyframes bounceIn': {
    '0%': {
      opacity: 0,
      transform: 'scale(0.9)',
    },
    '50%': {
      opacity: 0.7,
      transform: 'scale(1.05)',
    },
    '100%': {
      opacity: 1,
      transform: 'scale(1)',
    },
  },
  '@keyframes slideUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const EditHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  '& h1': {
    fontSize: '3.5rem',
    fontWeight: 800,
    background: 'linear-gradient(90deg, #667eea, #764ba2)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  '& p': {
    fontSize: '1.2rem',
    color: '#666',
    marginTop: theme.spacing(1),
  },
}));

const EditTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 700,
  color: '#333',
  marginBottom: theme.spacing(1),
}));

const EditSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: '#666',
  marginBottom: theme.spacing(4),
}));

const BackButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(90deg, #667eea, #764ba2)',
  color: 'white',
  '&:hover': {
    background: 'linear-gradient(90deg, #5a67d8, #6b46c1)',
  },
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1, 3),
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
}));

const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontSize: '1.1rem',
  fontWeight: 600,
  color: '#555',
  marginBottom: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(2),
    background: '#f5f5f5',
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
    '&:hover fieldset': {
      borderColor: '#bdbdbd',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#667eea',
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(2),
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(90deg, #667eea, #764ba2)',
  color: 'white',
  '&:hover': {
    background: 'linear-gradient(90deg, #5a67d8, #6b46c1)',
  },
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1.5, 4),
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1.1rem',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  '& .MuiCircularProgress-root': {
    marginRight: theme.spacing(1),
  },
}));

const UserInfoCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(20px)',
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  marginBottom: theme.spacing(4),
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #667eea, #764ba2)',
  },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  fontSize: '1.5rem',
  fontWeight: 700,
  background: 'linear-gradient(135deg, #667eea, #764ba2)',
  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
}));

const BlogDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = useSelector(state => state.user);
  const [input, setInput] = useState({
    title: '',
    description: '',
    image: '', // Changed from imageURL to image to match backend
  });
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const fetchDetails = useCallback(async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError('User not authenticated');
        return null;
      }

      const res = await axios.get(`${serverURL}/api/blog/${id}`, {
        headers: {
          'Authorization': `Bearer ${userId}`,
          'Content-Type': 'application/json'
        }
      });
      const data = res.data;
      console.log('Fetched blog data:', data); // Debug log
      return data.blog;
    } catch (error) {
      console.error('Error fetching blog details:', error);
      setError('Failed to load blog details. Please try again.');
      return null;
    }
  }, [id]);

  useEffect(() => {
    const loadBlogDetails = async () => {
      const data = await fetchDetails();
      if (data) {
        setBlog(data);
        setInput({
          title: data.title || '',
          description: data.description || '',
          image: data.image || '', // Changed from imageURL to image
        });
        console.log('Set input state:', {
          title: data.title || '',
          description: data.description || '',
          image: data.image || '',
        }); // Debug log
        
        // Check if the blog belongs to the current user
        if (currentUser && data.user && currentUser._id !== data.user._id) {
          setError('You can only edit your own blogs');
        }
      } else {
        setError('Blog not found');
      }
      setIsLoading(false);
    };
    
    loadBlogDetails();
  }, [fetchDetails, currentUser]);

  const sendRequest = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error('User not authenticated');
      }

      console.log('Sending update request with:', input); // Debug log
      const res = await axios.put(`${serverURL}/api/blog/update/${id}`, {
        title: input.title,
        description: input.description,
        image: input.image, // Include image field in the request
      }, {
        headers: {
          'Authorization': `Bearer ${userId}`,
          'Content-Type': 'application/json'
        }
      });
      const data = res.data;
      console.log('Update response:', data); // Debug log
      return data;
    } catch (error) {
      console.error('Error updating blog:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update blog';
      setError(errorMessage);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!input.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!input.description.trim()) {
      setError('Description is required');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const data = await sendRequest();
      console.log('Blog updated successfully:', data);
      
      Swal.fire({
        icon: 'success',
        title: 'Blog Updated Successfully!',
        text: 'Your blog has been updated and saved.',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        customClass: {
          popup: 'swal2-custom-popup',
          title: 'swal2-custom-title',
          confirmButton: 'swal2-custom-confirm',
        },
      }).then(() => navigate('/myblogs'));
    } catch (error) {
      console.error('Error updating blog:', error);
      // Error is already set in sendRequest
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/myblogs');
  };

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Date not available';
    }
  };

  if (isLoading) {
    return (
      <EditContainer maxWidth={false}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress size={60} thickness={4} sx={{ color: 'primary.main' }} />
        </Box>
      </EditContainer>
    );
  }

  if (error && !blog) {
    return (
      <EditContainer maxWidth={false}>
        <Container maxWidth="md">
          <Box textAlign="center" py={8}>
            <Alert severity="error" sx={{ mb: 4, borderRadius: 3, fontSize: '1.1rem' }}>
              {error}
            </Alert>
            <BackButton onClick={handleBack} startIcon={<ArrowBackIcon />}>
              Back to My Blogs
            </BackButton>
          </Box>
        </Container>
      </EditContainer>
    );
  }

  return (
    <EditContainer maxWidth={false}>
      <Container maxWidth="lg">
        <EditCard elevation={0} className="bounce-in">
          {/* Header */}
          <EditHeader>
            <EditTitle variant="h1">
              Edit Your Blog
            </EditTitle>
            <EditSubtitle variant="body1">
              Update your blog post with new content and make it even better
            </EditSubtitle>
          </EditHeader>

          {/* Back Button */}
          <Box display="flex" justifyContent="flex-start" mb={4}>
            <BackButton onClick={handleBack} startIcon={<ArrowBackIcon />}>
              Back to My Blogs
            </BackButton>
          </Box>

          {/* User Info Card */}
          {blog && blog.user ? (
            <UserInfoCard className="slide-up">
              <CardContent>
                <Grid container spacing={3} alignItems="center">
                  <Grid item>
                    <UserAvatar>
                      {blog.user.name ? blog.user.name.charAt(0).toUpperCase() : 'U'}
                    </UserAvatar>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6" fontWeight={700} color="primary" gutterBottom>
                      {blog.user.name || 'Unknown User'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1}>
                      <CalendarIcon fontSize="small" />
                      {formatDate(blog.createdAt)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Chip
                      icon={<PersonIcon />}
                      label="Blog Author"
                      color="primary"
                      variant="outlined"
                      sx={{ fontWeight: 600 }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </UserInfoCard>
          ) : (
            <Alert 
              severity="warning" 
              icon={<WarningIcon />}
              sx={{ mb: 4, borderRadius: 3 }}
              className="slide-up"
            >
              User details not available. This might be a system issue.
            </Alert>
          )}

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 4, borderRadius: 3, fontSize: '1rem' }} className="slide-up">
              {error}
            </Alert>
          )}

          {/* Edit Form */}
          {input && (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                {/* Title Section */}
                <Grid item xs={12}>
                  <FormSection>
                    <SectionTitle variant="h6">
                      <TitleIcon color="primary" />
                      Blog Title
                    </SectionTitle>
                    <StyledTextField
                      name="title"
                      onChange={handleChange}
                      value={input.title}
                      placeholder="Enter your blog title"
                      fullWidth
                      multiline
                      rows={2}
                      className="slide-up"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <TitleIcon color="action" sx={{ fontSize: '1.5rem' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormSection>
                </Grid>

                {/* Description Section */}
                <Grid item xs={12}>
                  <FormSection>
                    <SectionTitle variant="h6">
                      <DescriptionIcon color="primary" />
                      Blog Content
                    </SectionTitle>
                    <StyledTextField
                      name="description"
                      onChange={handleChange}
                      value={input.description}
                      placeholder="Write your blog content here..."
                      fullWidth
                      multiline
                      rows={8}
                      className="slide-up"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DescriptionIcon color="action" sx={{ fontSize: '1.5rem' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormSection>
                </Grid>

                {/* Image URL Section */}
                <Grid item xs={12}>
                  <FormSection>
                    <SectionTitle variant="h6">
                      <ImageIcon color="primary" />
                      Image URL
                    </SectionTitle>
                    <StyledTextField
                      name="image"
                      onChange={handleChange}
                      value={input.image}
                      placeholder="Enter image URL for your blog"
                      fullWidth
                      className="slide-up"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ImageIcon color="action" sx={{ fontSize: '1.5rem' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {input.image && (
                      <Box mt={2} textAlign="center">
                        <img 
                          src={input.image} 
                          alt="Blog preview" 
                          style={{ 
                            maxWidth: '100%', 
                            maxHeight: '200px', 
                            borderRadius: '8px',
                            border: '2px solid #e0e0e0'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                        <Typography 
                          variant="caption" 
                          color="error" 
                          style={{ display: 'none' }}
                        >
                          Invalid image URL
                        </Typography>
                      </Box>
                    )}
                  </FormSection>
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              {/* Submit Button */}
              <SubmitButton
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                className="slide-up"
              >
                {isSubmitting ? 'Updating Blog...' : 'Update Blog'}
              </SubmitButton>

              {/* Success Message */}
              {isSubmitting && (
                <Box mt={3} textAlign="center">
                  <Chip
                    icon={<CheckCircleIcon />}
                    label="Saving your changes..."
                    color="success"
                    variant="outlined"
                    sx={{ fontSize: '1rem', padding: 1 }}
                  />
                </Box>
              )}
            </form>
          )}
        </EditCard>
      </Container>
    </EditContainer>
  );
};

export default BlogDetail;
