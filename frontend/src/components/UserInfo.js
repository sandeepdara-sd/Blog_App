import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  CircularProgress, 
  Button, 
  Card, 
  CardContent, 
  Avatar,
  Grid,
  Chip,
  Divider,
  Alert,
  IconButton,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Article as ArticleIcon,
  CalendarToday as CalendarIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import axios from 'axios';
import { serverURL } from './../helper/Helper';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

// Styled Components
const UserInfoContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(4, 0),
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23667eea" fill-opacity="0.02"%3E%3Ccircle cx="50" cy="50" r="3"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    animation: 'float 30s ease-in-out infinite',
  },
}));

const UserCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(30px)',
  borderRadius: theme.spacing(4),
  boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
  padding: theme.spacing(6),
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
  },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  fontSize: '3rem',
  fontWeight: 700,
  background: 'linear-gradient(135deg, #667eea, #764ba2)',
  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
  border: '4px solid white',
}));

const BackButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea, #764ba2)',
  color: 'white',
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.spacing(3),
  fontSize: '1.1rem',
  fontWeight: 700,
  textTransform: 'none',
  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
  },
}));

const BlogCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(20px)',
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 16px 40px rgba(0,0,0,0.15)',
  },
}));

// Fixed image container with proper aspect ratio handling
const ImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '200px',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: '#f5f5f5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
}));

// Updated blog image with proper fitting - choose between contain or cover
const BlogImageContain = styled('img')({
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain', // Shows entire image, may have letterboxing
  objectPosition: 'center',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const BlogImageCover = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Fills container, may crop image
  objectPosition: 'center',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const NoImagePlaceholder = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f0f0f0',
  color: '#999',
  fontSize: '0.875rem',
  fontWeight: 500,
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const UserInfo = ({ imageFitMode = 'contain' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Check if user is authenticated
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${serverURL}/api/user/${id}`, {
          headers: {
            'Authorization': `Bearer ${userId}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('User data received:', response.data);
        setUser(response.data.user);
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleEditBlog = (blogId) => {
    navigate(`/myblogs/${blogId}`);
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const userId = localStorage.getItem("userId");
        await axios.delete(`${serverURL}/api/blog/${blogId}`, {
          headers: {
            'Authorization': `Bearer ${userId}`,
            'Content-Type': 'application/json'
          }
        });

        // Refresh user data to update blogs list
        const response = await axios.get(`${serverURL}/api/user/${id}`, {
          headers: {
            'Authorization': `Bearer ${userId}`,
            'Content-Type': 'application/json'
          }
        });
        setUser(response.data.user);

        Swal.fire(
          'Deleted!',
          'Your blog has been deleted.',
          'success'
        );
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      Swal.fire(
        'Error!',
        'Failed to delete blog. Please try again.',
        'error'
      );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Date not available';
    }
  };

  // Choose the appropriate image component based on fit mode
  const BlogImage = imageFitMode === 'cover' ? BlogImageCover : BlogImageContain;

  if (loading) {
    return (
      <UserInfoContainer maxWidth={false}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress size={60} thickness={4} sx={{ color: 'primary.main' }} />
        </Box>
      </UserInfoContainer>
    );
  }

  if (error) {
    return (
      <UserInfoContainer maxWidth={false}>
        <Container maxWidth="md">
          <Box textAlign="center" py={8}>
            <Alert severity="error" sx={{ mb: 4, borderRadius: 3, fontSize: '1.1rem' }}>
              {error}
            </Alert>
            <BackButton onClick={() => navigate('/myblogs')} startIcon={<ArrowBackIcon />}>
              Back to My Blogs
            </BackButton>
          </Box>
        </Container>
      </UserInfoContainer>
    );
  }

  if (!user) {
    return (
      <UserInfoContainer maxWidth={false}>
        <Container maxWidth="md">
          <Box textAlign="center" py={8}>
            <Alert severity="warning" sx={{ mb: 4, borderRadius: 3, fontSize: '1.1rem' }}>
              No user details available
            </Alert>
            <BackButton onClick={() => navigate('/myblogs')} startIcon={<ArrowBackIcon />}>
              Back to My Blogs
            </BackButton>
          </Box>
        </Container>
      </UserInfoContainer>
    );
  }

  return (
    <UserInfoContainer maxWidth={false}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <BackButton onClick={() => navigate('/myblogs')} startIcon={<ArrowBackIcon />}>
            Back to My Blogs
          </BackButton>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800,
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            User Profile
          </Typography>
        </Box>

        {/* User Details Card */}
        <UserCard elevation={0} className="bounce-in">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <UserAvatar>
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </UserAvatar>
            <Box sx={{ ml: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {user.name || 'Unknown User'}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                <EmailIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                {user.email || 'No email available'}
              </Typography>
              <Chip
                icon={<PersonIcon />}
                label={`${user.blogs ? user.blogs.length : 0} Blogs`}
                color="primary"
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* User's Blogs Section */}
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center' }}>
              <ArticleIcon sx={{ mr: 2, color: 'primary.main' }} />
              {user.blogs && user.blogs.length > 0 ? `${user.blogs.length} Blog Posts` : 'No Blog Posts Yet'}
            </Typography>

            {user.blogs && user.blogs.length > 0 ? (
              <Grid container spacing={3}>
                {user.blogs.map((blog) => (
                  <Grid item xs={12} md={6} lg={4} key={blog._id}>
                    <BlogCard>
                      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {/* Fixed Image Container */}
                        <ImageContainer>
                          {blog.image ? (
                            <BlogImage
                              src={blog.image}
                              alt={blog.title}
                              onError={(e) => {
                                e.target.style.display = 'none';
                                const placeholder = e.target.parentNode.querySelector('.image-placeholder');
                                if (placeholder) {
                                  placeholder.style.display = 'flex';
                                }
                              }}
                            />
                          ) : null}
                          <NoImagePlaceholder
                            className="image-placeholder"
                            sx={{ display: blog.image ? 'none' : 'flex' }}
                          >
                            <ArticleIcon sx={{ fontSize: '2.5rem', color: '#ccc', mb: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              No Image Available
                            </Typography>
                          </NoImagePlaceholder>
                        </ImageContainer>

                        {/* Blog Content */}
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, lineHeight: 1.3 }}>
                            {blog.title}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ 
                              mb: 2,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              flex: 1,
                              lineHeight: 1.5,
                            }}
                          >
                            {blog.description}
                          </Typography>
                          
                          {/* Footer with date and actions */}
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            mt: 'auto',
                            pt: 2,
                            borderTop: '1px solid rgba(0,0,0,0.08)'
                          }}>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarIcon sx={{ fontSize: '0.9rem', mr: 0.5 }} />
                              {formatDate(blog.createdAt)}
                            </Typography>
                            <Box>
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => handleEditBlog(blog._id)}
                                sx={{ 
                                  mr: 1,
                                  '&:hover': {
                                    backgroundColor: 'rgba(25, 118, 210, 0.08)'
                                  }
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDeleteBlog(blog._id)}
                                sx={{
                                  '&:hover': {
                                    backgroundColor: 'rgba(244, 67, 54, 0.08)'
                                  }
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </BlogCard>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box textAlign="center" py={6}>
                <ArticleIcon sx={{ fontSize: '4rem', color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  No blog posts yet
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Start writing your first blog post to share your thoughts with the world!
                </Typography>
                <Button
                  component={Link}
                  to="/blogs/add"
                  variant="contained"
                  size="large"
                  sx={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a6fd8, #6a4190)',
                    },
                  }}
                >
                  Create Your First Blog
                </Button>
              </Box>
            )}
          </Box>
        </UserCard>
      </Container>
    </UserInfoContainer>
  );
};

export default UserInfo;