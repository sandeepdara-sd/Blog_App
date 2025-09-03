import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import Blog from './Blog';
import { serverURL } from '../helper/Helper';
import { 
  Box, 
  Typography, 
  Container, 
  CircularProgress, 
  Alert,
  Button,
  Paper,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Article as ArticleIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Styled Components
const UserBlogContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4, 2),
  minHeight: 'calc(100vh - 80px)',
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
}));

const UserBlogHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  padding: theme.spacing(4, 0),
}));

const UserBlogTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(135deg, #667eea, #764ba2)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}));

const UserBlogSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  color: theme.palette.text.secondary,
  maxWidth: '600px',
  margin: '0 auto',
  lineHeight: 1.6,
}));

const SearchContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
}));

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(2),
    background: 'rgba(255, 255, 255, 0.8)',
    '& fieldset': {
      borderColor: 'rgba(102, 126, 234, 0.2)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(102, 126, 234, 0.4)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(102, 126, 234, 0.8)',
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(2),
    fontSize: '1.1rem',
  },
}));

const SearchResults = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.9)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(102, 126, 234, 0.1)',
}));

const EmptyState = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(8, 4),
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  maxWidth: '600px',
  margin: '0 auto',
  marginTop: theme.spacing(4),
}));

const CreateBlogButton = styled(Button)(({ theme }) => ({
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
    background: 'linear-gradient(135deg, #5a6fd8, #6a4190)',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
  },
}));

const RefreshButton = styled(Button)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  color: theme.palette.primary.main,
  padding: theme.spacing(1, 3),
  borderRadius: theme.spacing(2),
  fontWeight: 600,
  textTransform: 'none',
  border: '2px solid rgba(102, 126, 234, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(102, 126, 234, 0.1)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.2)',
  },
}));

const UserBlog = () => {
  const [user, setUser] = useState(null);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const id = localStorage.getItem("userId");

  const fetchUserBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const sendRequest = async () => {
        try {
          const res = await axios.get(`${serverURL}/api/blog/user/${id}`);
          const data = await res.data;
          return data;
        } catch (err) {
          console.error('Error fetching user blogs:', err);
          setError('Failed to fetch your blogs. Please try again.');
          throw err;
        }
      };
      
      const data = await sendRequest();
      setUser(data.user);
      setFilteredBlogs(data.user?.blogs || []);
    } catch (err) {
      console.error('Error in fetchUserBlogs:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleRetry = () => {
    fetchUserBlogs();
  };

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredBlogs(user?.blogs || []);
      return;
    }

    const filtered = (user?.blogs || []).filter(blog => {
      const searchTerm = query.toLowerCase();
      const title = blog.title?.toLowerCase() || '';
      const description = blog.description?.toLowerCase() || '';
      
      return title.includes(searchTerm) || 
             description.includes(searchTerm);
    });
    
    setFilteredBlogs(filtered);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredBlogs(user?.blogs || []);
  };

  useEffect(() => {
    const loadUserBlogs = async () => {
      await fetchUserBlogs();
    };
    loadUserBlogs();
  }, [fetchUserBlogs]);

  // Update filtered blogs when user data changes
  useEffect(() => {
    if (user?.blogs) {
      setFilteredBlogs(user.blogs);
    }
  }, [user]);

  if (loading) {
    return (
      <UserBlogContainer maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress size={60} thickness={4} sx={{ color: 'primary.main' }} />
        </Box>
      </UserBlogContainer>
    );
  }

  if (error) {
    return (
      <UserBlogContainer maxWidth="lg">
        <Box textAlign="center" py={8}>
          <Alert severity="error" sx={{ mb: 4, borderRadius: 3, fontSize: '1.1rem' }}>
            {error}
          </Alert>
          <RefreshButton
            onClick={handleRetry}
            startIcon={<RefreshIcon />}
          >
            Try Again
          </RefreshButton>
        </Box>
      </UserBlogContainer>
    );
  }

  // Render no search results
  const renderNoSearchResults = () => (
    <EmptyState className="fade-in">
      <SearchIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
      <Typography variant="h4" color="primary" mb={2} fontWeight={600}>
        No Results Found
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4} sx={{ maxWidth: '400px', mx: 'auto' }}>
        No blogs match your search for "{searchQuery}". Try different keywords or clear your search.
      </Typography>
      <Button
        variant="outlined"
        onClick={clearSearch}
        startIcon={<ClearIcon />}
        sx={{ 
          borderColor: 'primary.main',
          color: 'primary.main',
          '&:hover': {
            borderColor: 'primary.dark',
            backgroundColor: 'primary.light',
            color: 'primary.dark'
          }
        }}
      >
        Clear Search
      </Button>
    </EmptyState>
  );

  return (
    <UserBlogContainer maxWidth="lg">
      {/* Header */}
      <UserBlogHeader>
        <UserBlogTitle variant="h1">
          My Blog Collection
        </UserBlogTitle>
        <UserBlogSubtitle variant="h6">
          Manage and showcase your personal blog posts
        </UserBlogSubtitle>
      </UserBlogHeader>

      {/* Search Bar */}
      {!loading && !error && user && user.blogs && user.blogs.length > 0 && (
        <SearchContainer className="fade-in">
          <SearchField
            fullWidth
            placeholder="Search your blogs by title or content..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={clearSearch}
                    edge="end"
                    size="small"
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          {/* Search Results Summary */}
          {searchQuery && (
            <SearchResults>
              <Typography variant="body2" color="text.secondary">
                Found {filteredBlogs.length} result{filteredBlogs.length !== 1 ? 's' : ''} for "{searchQuery}"
                {filteredBlogs.length !== user.blogs.length && (
                  <span> out of {user.blogs.length} total blogs</span>
                )}
              </Typography>
            </SearchResults>
          )}
        </SearchContainer>
      )}

      {/* Content */}
      <Box>
        {user && user.blogs && user.blogs.length > 0 ? (
          <Box className="fade-in">
            {searchQuery && filteredBlogs.length === 0 ? (
              // No search results
              renderNoSearchResults()
            ) : (
              // Display filtered blogs
              filteredBlogs.map((blog, index) => (
                <Blog
                  key={blog._id}
                  id={blog._id}
                  isUser={true}
                  title={blog.title}
                  description={blog.description}
                  imageURL={blog.image}
                  userName={user.name}
                  createdAt={blog.createdAt}
                />
              ))
            )}
          </Box>
        ) : (
          <EmptyState className="fade-in">
            <ArticleIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
            <Typography variant="h4" color="primary" mb={2} fontWeight={600}>
              No Blogs Yet
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4} sx={{ maxWidth: '400px', mx: 'auto' }}>
              You haven't created any blog posts yet. Start sharing your thoughts and stories with the world!
            </Typography>
            <CreateBlogButton
              component={Link}
              to="/blogs/add"
              startIcon={<AddIcon />}
            >
              Create Your First Blog
            </CreateBlogButton>
          </EmptyState>
        )}
      </Box>

      {/* Refresh button for failed requests */}
      {!loading && !error && user && user.blogs && user.blogs.length === 0 && (
        <Box textAlign="center" mt={4}>
          <RefreshButton
            onClick={handleRetry}
            startIcon={<RefreshIcon />}
          >
            Refresh
          </RefreshButton>
        </Box>
      )}
    </UserBlogContainer>
  );
};

export default UserBlog;
