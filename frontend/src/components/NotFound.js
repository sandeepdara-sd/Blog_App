import { Box, Typography, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NotFound() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <Container sx={{ py: 8, textAlign: 'center' }}>
      <Box sx={{ fontSize: 96, fontWeight: 800, mb: 2, opacity: 0.2 }}>404</Box>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>Page not found</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        The page you are looking for doesn’t exist or has been moved.
      </Typography>
      <Button
        component={RouterLink}
        to={isLoggedIn ? "/blogs" : "/"}
        variant="contained"
        size="large"
      >
        Go {isLoggedIn ? "to Blogs" : "Home"}
      </Button>
    </Container>
  );
}

export default NotFound;
