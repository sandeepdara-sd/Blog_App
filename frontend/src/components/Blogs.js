import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import Blog from './Blog';
import { serverURL } from '../helper/Helper';
import { 
  Box, 
  Typography, 
  Container, 
  Skeleton, 
  Card, 
  Alert,
  Button,
  Snackbar,
  TextField,
  InputAdornment,
  Paper,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Refresh as RefreshIcon,
  Article as ArticleIcon,
  Search as SearchIcon,
  Clear as ClearIcon
} from '@mui/icons-material';

// Styled Components
const BlogsContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4, 2),
  minHeight: 'calc(100vh - 80px)',
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
}));

const BlogsHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  padding: theme.spacing(4, 0),
}));

const BlogsTitle = styled(Typography)(({ theme }) => ({
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

const BlogsSubtitle = styled(Typography)(({ theme }) => ({
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

const SkeletonCard = styled(Card)(({ theme }) => ({
  background: 'white',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  overflow: 'hidden',
  maxWidth: '800px',
  margin: '0 auto',
  marginTop: theme.spacing(3),
}));

const EmptyState = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(8, 2),
  background: 'white',
  borderRadius: theme.spacing(3),
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  maxWidth: '600px',
  margin: '0 auto',
}));

const RefreshButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea, #764ba2)',
  color: 'white',
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.spacing(2),
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a6fd8, #6a4190)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
  },
}));

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [migrationMessage, setMigrationMessage] = useState("");
  const [showMigrationMessage, setShowMigrationMessage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError("");
    
    try {
      const sendRequest = async () => {
        try {
          const res = await axios.get(`${serverURL}/api/blog/`);
          const data = await res.data;
          return data;
        } catch (err) {
          console.log(err);
          const errorMessage = 'Something went wrong while fetching the blogs. Please try again.';
          setError(errorMessage);
          throw err;
        }
      };
      
      const data = await sendRequest();
      setBlogs(data.blogs || []);
      setFilteredBlogs(data.blogs || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchBlogs();
  };

  const handleMigrateTimestamps = async () => {
    try {
      const response = await axios.post(`${serverURL}/api/blog/migrate-timestamps`);
      setMigrationMessage(response.data.message);
      setShowMigrationMessage(true);
      // Refresh blogs after migration
      setTimeout(() => {
        fetchBlogs();
      }, 1000);
    } catch (error) {
      console.error('Migration failed:', error);
      setMigrationMessage('Migration failed. Please try again.');
      setShowMigrationMessage(true);
    }
  };

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredBlogs(blogs);
      return;
    }

    const filtered = blogs.filter(blog => {
      const searchTerm = query.toLowerCase();
      const title = blog.title?.toLowerCase() || '';
      const description = blog.description?.toLowerCase() || '';
      const userName = blog.user?.name?.toLowerCase() || '';
      
      return title.includes(searchTerm) || 
             description.includes(searchTerm) || 
             userName.includes(searchTerm);
    });
    
    setFilteredBlogs(filtered);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredBlogs(blogs);
  };

  useEffect(() => {
    const loadBlogs = async () => {
      await fetchBlogs();
    };
    loadBlogs();
  }, [fetchBlogs]);

  // Render skeleton loading cards
  const renderSkeletons = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <SkeletonCard key={index} className="fade-in">
        <Box sx={{ position: 'relative' }}>
          {/* Image skeleton */}
          <Skeleton 
            variant="rectangular" 
            height={300} 
            sx={{ 
              background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
              backgroundSize: '200% 100%',
              animation: 'loading 1.5s infinite',
            }} 
          />
          
          {/* Header skeleton */}
          <Box sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Skeleton variant="circular" width={56} height={56} />
              <Box sx={{ ml: 2, flexGrow: 1 }}>
                <Skeleton variant="text" width="60%" height={32} />
                <Skeleton variant="text" width="40%" height={24} />
              </Box>
            </Box>
            
            {/* User chip skeleton */}
            <Box mb={2}>
              <Skeleton variant="rectangular" width={120} height={32} sx={{ borderRadius: 16 }} />
            </Box>
            
            {/* Content skeleton */}
            <Skeleton variant="text" width="100%" height={24} />
            <Skeleton variant="text" width="90%" height={24} />
            <Skeleton variant="text" width="80%" height={24} />
            <Skeleton variant="text" width="70%" height={24} />
          </Box>
        </Box>
      </SkeletonCard>
    ));
  };

  // Render empty state
  const renderEmptyState = () => (
    <EmptyState className="fade-in">
      <ArticleIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
      <Typography variant="h4" color="primary" mb={2} fontWeight={600}>
        No Blogs Available
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4} sx={{ maxWidth: '400px', mx: 'auto' }}>
        It looks like there are no blogs published yet. Be the first to share your story with the community!
      </Typography>
      <RefreshButton
        onClick={handleRetry}
        startIcon={<RefreshIcon />}
      >
        Refresh
      </RefreshButton>
    </EmptyState>
  );

  // Render error state
  const renderErrorState = () => (
    <EmptyState className="fade-in">
      <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
        {error}
      </Alert>
      <RefreshButton
        onClick={handleRetry}
        startIcon={<RefreshIcon />}
      >
        Try Again
      </RefreshButton>
    </EmptyState>
  );

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
    <BlogsContainer maxWidth="lg">
      {/* Header */}
      <BlogsHeader>
        <BlogsTitle variant="h1">
          Discover Amazing Stories
        </BlogsTitle>
        <BlogsSubtitle variant="h6">
          Explore a collection of inspiring blogs written by our community of creators
        </BlogsSubtitle>
      </BlogsHeader>

      {/* Search Bar */}
      {!loading && !error && blogs.length > 0 && (
        <SearchContainer className="fade-in">
          <SearchField
            fullWidth
            placeholder="Search blogs by title, content, or author..."
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
                {filteredBlogs.length !== blogs.length && (
                  <span> out of {blogs.length} total blogs</span>
                )}
              </Typography>
            </SearchResults>
          )}
        </SearchContainer>
      )}

      {/* Content */}
      <Box>
        {loading ? (
          // Loading state with skeletons
          renderSkeletons()
        ) : error ? (
          // Error state
          renderErrorState()
        ) : blogs && blogs.length > 0 ? (
          // Blogs list
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
                  isUser={localStorage.getItem("userId") === blog.user._id}
                  title={blog.title}
                  description={blog.description}
                  imageURL={blog.image}
                  userName={blog.user.name}
                  createdAt={blog.createdAt}
                />
              ))
            )}
          </Box>
        ) : (
          // Empty state
          renderEmptyState()
        )}
      </Box>

      {/* Retry button for failed requests */}
      {!loading && !error && blogs.length === 0 && retryCount > 0 && (
        <Box textAlign="center" mt={4}>
          <RefreshButton
            onClick={handleRetry}
            startIcon={<RefreshIcon />}
          >
            Refresh Blogs
          </RefreshButton>
        </Box>
      )}

      {/* Migration button for development */}
      {!loading && blogs.length > 0 && (
        <Box textAlign="center" mt={4}>
          <Button
            variant="outlined"
            onClick={handleMigrateTimestamps}
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
            Fix Blog Dates (Development)
          </Button>
        </Box>
      )}

      {/* Migration message */}
      <Snackbar
        open={showMigrationMessage}
        autoHideDuration={6000}
        onClose={() => setShowMigrationMessage(false)}
        message={migrationMessage}
      />
    </BlogsContainer>
  );
};

export default Blogs;
