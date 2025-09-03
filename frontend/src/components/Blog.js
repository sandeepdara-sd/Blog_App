import { 
    Avatar, 
    Box, 
    Card, 
    CardContent, 
    CardHeader, 
    IconButton, 
    Typography,
    Chip,
    Divider,
    Container,
    Grid
  } from '@mui/material';
  import { styled } from '@mui/material/styles';
  import { 
    red, 
    blue, 
    green, 
    orange, 
    purple 
  } from '@mui/material/colors';
  import React from 'react';
  import DeleteIcon from '@mui/icons-material/Delete';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import { serverURL } from '../helper/Helper';
  import { 
    AccessTime as AccessTimeIcon,
    Person as PersonIcon,
    Edit as EditIcon
  } from '@mui/icons-material';
  
  // Styled Components - Enhanced
  const StyledCard = styled(Card)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: theme.spacing(3),
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    maxWidth: '900px',
    margin: '0 auto',
    marginTop: theme.spacing(4),
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
      backgroundSize: '200% 100%',
      animation: 'gradientShift 3s ease infinite',
    },
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: '0 25px 50px rgba(0,0,0,0.15), 0 0 30px rgba(102, 126, 234, 0.2)',
    },
  }));
  
  const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
    padding: theme.spacing(4, 4, 3, 4),
    '& .MuiCardHeader-avatar': {
      width: 64,
      height: 64,
      fontSize: '1.8rem',
      fontWeight: 'bold',
      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
      transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      '&:hover': {
        transform: 'scale(1.1) rotate(5deg)',
        boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
      },
    },
    '& .MuiCardHeader-title': {
      fontSize: '1.75rem',
      fontWeight: 800,
      color: theme.palette.grey[900],
      lineHeight: 1.3,
      fontFamily: "'Outfit', sans-serif",
      letterSpacing: '-0.01em',
    },
    '& .MuiCardHeader-subheader': {
      fontSize: '1rem',
      color: theme.palette.grey[600],
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 500,
    },
  }));
  
  // Fixed StyledCardMedia with proper image fitting
  const StyledCardMedia = styled(Box)(({ theme }) => ({
    height: '300px',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain', // This ensures the whole image is visible
      objectPosition: 'center',
      transition: 'transform 0.4s ease',
      display: 'block',
      borderRadius: theme.spacing(2),
    },
    '&:hover img': {
      transform: 'scale(1.05)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 100%)',
      opacity: 0,
      transition: 'opacity 0.4s ease',
      zIndex: 1,
      borderRadius: theme.spacing(2),
    },
    '&:hover::before': {
      opacity: 1,
    },
    // Responsive height adjustments
    [theme.breakpoints.down('sm')]: {
      height: '250px',
    },
    [theme.breakpoints.down('xs')]: {
      height: '200px',
    },
  }));
  
  // Alternative version for cover-style fitting (if you prefer to fill the container)
  const StyledCardMediaCover = styled(Box)(({ theme }) => ({
    height: '300px',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover', // This fills the container but may crop the image
      objectPosition: 'center',
      transition: 'transform 0.4s ease',
      display: 'block',
      borderRadius: theme.spacing(2),
    },
    '&:hover img': {
      transform: 'scale(1.05)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 100%)',
      opacity: 0,
      transition: 'opacity 0.4s ease',
      zIndex: 1,
      borderRadius: theme.spacing(2),
    },
    '&:hover::before': {
      opacity: 1,
    },
    [theme.breakpoints.down('sm')]: {
      height: '250px',
    },
    [theme.breakpoints.down('xs')]: {
      height: '200px',
    },
  }));
  
  const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(4),
    '& .MuiTypography-body2': {
      fontSize: '1.125rem',
      lineHeight: 1.8,
      color: theme.palette.grey[700],
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 400,
    },
  }));
  
  const ActionButtons = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(3),
    right: theme.spacing(3),
    display: 'flex',
    gap: theme.spacing(1.5),
    zIndex: 10,
  }));
  
  const ActionButton = styled(IconButton)(({ theme, variant }) => ({
    backgroundColor: variant === 'edit' ? 'rgba(255, 193, 7, 0.95)' : 'rgba(244, 67, 54, 0.95)',
    color: variant === 'edit' ? '#fff' : '#fff',
    backdropFilter: 'blur(20px)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    width: 48,
    height: 48,
    '&:hover': {
      backgroundColor: variant === 'edit' ? 'rgba(255, 193, 7, 1)' : 'rgba(244, 67, 54, 1)',
      transform: 'scale(1.15) rotate(5deg)',
      boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
    },
  }));
  
  const UserChip = styled(Chip)(({ theme }) => ({
    backgroundColor: 'rgba(25, 118, 210, 0.1)',
    color: theme.palette.primary.main,
    fontWeight: 700,
    fontSize: '1rem',
    height: 40,
    borderRadius: theme.spacing(2),
    border: '2px solid rgba(25, 118, 210, 0.2)',
    transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    '&:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.15)',
      borderColor: 'rgba(25, 118, 210, 0.4)',
      transform: 'scale(1.05)',
    },
    '& .MuiChip-avatar': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      width: 24,
      height: 24,
    },
  }));
  
  const Blog = ({ title, description, imageURL, userName, isUser, id, imageFitMode = 'contain', createdAt }) => {
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
        confirmButtonText: 'Yes, delete it!',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        customClass: {
          popup: 'swal2-custom-popup',
          title: 'swal2-custom-title',
          confirmButton: 'swal2-custom-confirm',
          cancelButton: 'swal2-custom-cancel',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          deleteRequest()
            .then(() => {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your blog post has been deleted.',
                icon: 'success',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
              }).then(() => navigate('/blogs'));
            })
            .catch((error) => {
              console.error('Error deleting blog:', error);
              Swal.fire({
                title: 'Oops...',
                text: 'Something went wrong! Please try again later.',
                icon: 'error',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
              });
            });
        }
      });
    };
  
    const formatDate = (date) => {
      if (!date) return 'Date not available';
      
      try {
        const options = { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        };
        return new Date(date).toLocaleDateString(undefined, options);
      } catch (error) {
        console.error('Error formatting date:', error);
        return 'Date not available';
      }
    };
  
    // Try to get the creation date from various sources
    const getCreationDate = () => {
      if (createdAt) {
        return formatDate(createdAt);
      }
      
      // If no createdAt, try to extract from the blog ID (MongoDB ObjectId contains timestamp)
      if (id) {
        try {
          // MongoDB ObjectId contains a timestamp in the first 4 bytes
          const timestamp = parseInt(id.substring(0, 8), 16) * 1000;
          return formatDate(new Date(timestamp));
        } catch (error) {
          console.error('Error extracting timestamp from ID:', error);
        }
      }
      
      return 'Date not available';
    };
  
    const displayDate = getCreationDate();
  
    // Generate avatar color based on username
    const getAvatarColor = (name) => {
      const colors = [red, blue, green, orange, purple];
      const index = name.charCodeAt(0) % colors.length;
      return colors[index][500];
    };
  
    // Choose the appropriate styled component based on imageFitMode
    const ImageContainer = imageFitMode === 'cover' ? StyledCardMediaCover : StyledCardMedia;
  
    return (
      <Container maxWidth="lg">
        <StyledCard className="fade-in-scale">
          {/* Action Buttons */}
          {isUser && (
            <ActionButtons>
              <ActionButton
                variant="edit"
                onClick={handleEdit}
                size="large"
                className="bounce-in"
              >
                <EditIcon fontSize="medium" />
              </ActionButton>
              <ActionButton
                variant="delete"
                onClick={handleDelete}
                size="large"
                className="bounce-in"
              >
                <DeleteIcon fontSize="medium" />
              </ActionButton>
            </ActionButtons>
          )}
  
          {/* Blog Image - Now properly fitted */}
          <ImageContainer className="hover-scale">
            <img
              src={imageURL}
              alt={title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/900x300/f5f5f5/999999?text=Image+Not+Found';
              }}
            />
          </ImageContainer>
  
          {/* Blog Header */}
          <StyledCardHeader
            avatar={
              <Avatar 
                sx={{ 
                  bgcolor: getAvatarColor(userName),
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.4rem',
                }} 
                aria-label="user avatar"
              >
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={title}
            subheader={
              <Box display="flex" alignItems="center" gap={1.5}>
                <AccessTimeIcon fontSize="small" color="action" />
                {displayDate}
              </Box>
            }
          />
  
          {/* User Info */}
          <Box px={4} pb={2}>
            <UserChip
              avatar={<Avatar sx={{ width: 24, height: 24, fontSize: '0.8rem' }}>{userName.charAt(0).toUpperCase()}</Avatar>}
              label={`By ${userName}`}
              variant="outlined"
              className="hover-lift"
            />
          </Box>
  
          <Divider sx={{ mx: 4, my: 3 }} />
  
          {/* Blog Content */}
          <StyledCardContent>
            <Typography variant="body2" component="div">
              {description}
            </Typography>
          </StyledCardContent>
  
          {/* Blog Footer */}
          <Box px={4} pb={4}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" gap={1.5}>
                  <PersonIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="500">
                    Author: {userName}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" justifyContent="flex-end">
                  <Chip 
                    label="Blog Post" 
                    size="medium" 
                    color="primary" 
                    variant="outlined"
                    sx={{ 
                      fontWeight: 600,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      borderRadius: 2,
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </StyledCard>
      </Container>
    );
  };
  
  export default Blog;