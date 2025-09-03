import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container,
  Paper,
  Grid,
  InputAdornment,
  Alert,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Title as TitleIcon,
  Description as DescriptionIcon,
  Image as ImageIcon,
  Send as SendIcon,
  Add as AddIcon
} from '@mui/icons-material';
import axios from 'axios';
import { serverURL } from '../helper/Helper';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Styled Components
const AddBlogContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4, 2),
  minHeight: 'calc(100vh - 80px)',
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
}));

const AddBlogCard = styled(Paper)(({ theme }) => ({
  background: 'white',
  borderRadius: theme.spacing(3),
  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
  padding: theme.spacing(4),
  maxWidth: 800,
  margin: '0 auto',
  border: '1px solid rgba(0,0,0,0.05)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #667eea, #764ba2)',
  },
}));

const AddBlogTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 700,
  textAlign: 'center',
  marginBottom: theme.spacing(1),
  background: 'linear-gradient(135deg, #667eea, #764ba2)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const AddBlogSubtitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(4),
  fontSize: '1.1rem',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(2),
    backgroundColor: 'rgba(248, 250, 252, 0.8)',
    border: '2px solid transparent',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(248, 250, 252, 0.9)',
      borderColor: 'rgba(102, 126, 234, 0.3)',
    },
    '&.Mui-focused': {
      backgroundColor: 'white',
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#667eea',
    fontWeight: 600,
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea, #764ba2)',
  color: 'white',
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.spacing(2),
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
  transition: 'all 0.3s ease',
  width: '100%',
  height: '56px',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a6fd8, #6a4190)',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
  },
  '&:disabled': {
    background: theme.palette.grey[400],
    transform: 'none',
    boxShadow: 'none',
  },
}));

const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 600,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const AddBlog = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sendRequest = async () => {
    try {
      const res = await axios.post(`${serverURL}/api/blog/add`, {
        title: input.title,
        description: input.description,
        image: input.imageURL,
        user: localStorage.getItem("userId")
      });
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
      const errorMessage = err.response?.data?.message || "Something went wrong while creating the blog";
      setError(errorMessage);
      throw err;
    }
  };

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    // Clear messages when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await sendRequest();
      setSuccess("Blog created successfully! Redirecting...");
      setTimeout(() => {
        navigate("/myblogs");
      }, 1500);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = input.title.trim() && input.description.trim() && input.imageURL.trim();

  return (
    <AddBlogContainer maxWidth="lg">
      <AddBlogCard elevation={0}>
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <AddBlogTitle variant="h1">
            Create Your Blog
          </AddBlogTitle>
          <AddBlogSubtitle variant="body1">
            Share your thoughts, ideas, and stories with the world
          </AddBlogSubtitle>
        </Box>

        {/* Messages */}
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
            {success}
          </Alert>
        )}

        {/* Blog Form */}
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
                  placeholder="Enter a compelling title for your blog"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TitleIcon color="action" />
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
                  required
                  multiline
                  rows={8}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                        <DescriptionIcon color="action" />
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
                  Featured Image
                </SectionTitle>
                <StyledTextField
                  name="imageURL"
                  onChange={handleChange}
                  value={input.imageURL}
                  placeholder="Enter the URL of your featured image"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ImageIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <Box mt={1}>
                  <Typography variant="caption" color="text.secondary">
                    Tip: Use high-quality images that are relevant to your blog content
                  </Typography>
                </Box>
              </FormSection>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" mt={2}>
                <SubmitButton
                  type="submit"
                  variant="contained"
                  disabled={isLoading || !isFormValid}
                  startIcon={isLoading ? null : <SendIcon />}
                  endIcon={isLoading ? null : <AddIcon />}
                >
                  {isLoading ? "Creating Blog..." : "Publish Blog"}
                </SubmitButton>
              </Box>
            </Grid>
          </Grid>
        </form>

        {/* Form Tips */}
        <Box mt={6} p={3} sx={{ 
          background: 'rgba(102, 126, 234, 0.05)', 
          borderRadius: 2,
          border: '1px solid rgba(102, 126, 234, 0.1)'
        }}>
          <Typography variant="h6" color="primary" mb={2}>
            💡 Writing Tips
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Chip label="✓" color="success" size="small" />
                <Typography variant="body2">Keep your title clear and engaging</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Chip label="✓" color="success" size="small" />
                <Typography variant="body2">Use descriptive and relevant images</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Chip label="✓" color="success" size="small" />
                <Typography variant="body2">Write compelling content that adds value</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Chip label="✓" color="success" size="small" />
                <Typography variant="body2">Proofread before publishing</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </AddBlogCard>
    </AddBlogContainer>
  );
};

export default AddBlog;