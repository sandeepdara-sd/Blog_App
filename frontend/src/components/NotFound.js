import { Box, Typography, Button, Container, Fade, Slide } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { keyframes } from '@mui/system';

// Animation keyframes
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
`;

const glitch = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

function NotFound() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <Container 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background circles */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(156, 39, 176, 0.1))',
          filter: 'blur(60px)',
          animation: `${float} 6s ease-in-out infinite`,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(233, 30, 99, 0.1))',
          filter: 'blur(80px)',
          animation: `${float} 8s ease-in-out infinite`,
          animationDelay: '1s',
          zIndex: 0,
        }}
      />

      {/* Main content */}
      <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: 600 }}>
        {/* 404 Number with glitch effect */}
        <Fade in timeout={800}>
          <Box
            sx={{
              position: 'relative',
              display: 'inline-block',
              mb: 4,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '120px', sm: '160px', md: '200px' },
                fontWeight: 900,
                lineHeight: 1,
                background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 50%, #e91e63 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: `${glitch} 3s infinite`,
                textShadow: '0 0 30px rgba(25, 118, 210, 0.3)',
              }}
            >
              404
            </Typography>
            
            {/* Glowing effect layers */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                fontSize: { xs: '120px', sm: '160px', md: '200px' },
                fontWeight: 900,
                lineHeight: 1,
                color: 'primary.main',
                opacity: 0.1,
                animation: `${pulse} 2s ease-in-out infinite`,
                zIndex: -1,
              }}
            >
              404
            </Box>
          </Box>
        </Fade>

        {/* Title */}
        <Slide direction="up" in timeout={1000}>
          <Typography 
            variant="h3" 
            sx={{ 
              mb: 2, 
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              background: 'linear-gradient(90deg, #1976d2, #9c27b0)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Page Not Found
          </Typography>
        </Slide>

        {/* Description */}
        <Slide direction="up" in timeout={1200}>
          <Typography 
            variant="h6"
            color="text.secondary" 
            sx={{ 
              mb: 5,
              px: { xs: 2, sm: 4 },
              fontSize: { xs: '1rem', sm: '1.25rem' },
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Oops! The page you're looking for seems to have wandered off into the digital void.
          </Typography>
        </Slide>

        {/* Button */}
        <Fade in timeout={1400}>
          <Box>
            <Button
              component={RouterLink}
              to={isLoggedIn ? "/blogs" : "/"}
              variant="contained"
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '50px',
                textTransform: 'none',
                background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
                boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1565c0 0%, #7b1fa2 100%)',
                  boxShadow: '0 12px 32px rgba(25, 118, 210, 0.4)',
                  transform: 'translateY(-2px)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
              }}
            >
              {isLoggedIn ? "Return to Blogs" : "Go Back Home"}
            </Button>
          </Box>
        </Fade>

        {/* Decorative elements */}
        <Box
          sx={{
            mt: 6,
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                opacity: 0.3,
                animation: `${pulse} 2s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default NotFound;
