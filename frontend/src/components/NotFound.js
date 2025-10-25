import { Box, Typography, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { keyframes } from '@mui/system';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const morphBlob = keyframes`
  0%, 100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
  50% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
  }
`;

function NotFound() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)',
        overflow: 'hidden',
        overflowY: 'hidden',
      }}
    >
      {/* Morphing blob decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: { xs: '250px', md: '400px' },
          height: { xs: '250px', md: '400px' },
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          opacity: 0.08,
          animation: `${morphBlob} 10s ease-in-out infinite`,
          zIndex: 0,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: { xs: '300px', md: '500px' },
          height: { xs: '300px', md: '500px' },
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          opacity: 0.06,
          animation: `${morphBlob} 15s ease-in-out infinite`,
          animationDelay: '2s',
          zIndex: 0,
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            textAlign: 'center',
            animation: `${scaleIn} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)`,
          }}
        >
          {/* 404 with sophisticated styling */}
          <Box sx={{ mb: 1, position: 'relative' }}>
            <Typography
              sx={{
                fontSize: { xs: '140px', sm: '180px', md: '220px' },
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                fontFamily: '"Space Grotesk", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                color: 'transparent',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                position: 'relative',
                display: 'inline-block',
                '&::before': {
                  content: '"404"',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                  backgroundSize: '1000px 100%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  animation: `${shimmer} 3s infinite`,
                  zIndex: 1,
                },
              }}
            >
              404
            </Typography>
          </Box>

          {/* Premium heading */}
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              fontFamily: '"Sora", "Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              mb: 2,
              color: '#1a1a1a',
              letterSpacing: '-0.02em',
              animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
            }}
          >
            Lost in Space
          </Typography>

          {/* Subheading with character */}
          <Typography
            sx={{
              fontSize: { xs: '1rem', sm: '1.125rem' },
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              color: '#666',
              mb: 5,
              maxWidth: '500px',
              mx: 'auto',
              lineHeight: 1.7,
              animation: `${fadeInUp} 0.8s ease-out 0.4s both`,
            }}
          >
            The page you're searching for has drifted into the unknown.
            <br />
            Let's get you back on track.
          </Typography>

          {/* CTA Button with market-level design */}
          <Box
            sx={{
              animation: `${fadeInUp} 0.8s ease-out 0.6s both`,
            }}
          >
            <Button
              component={RouterLink}
              to={isLoggedIn ? "/blogs" : "/"}
              variant="contained"
              disableElevation
              sx={{
                px: { xs: 4, sm: 6 },
                py: 1.75,
                fontSize: { xs: '0.95rem', sm: '1.05rem' },
                fontWeight: 600,
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                borderRadius: '12px',
                textTransform: 'none',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                letterSpacing: '0.3px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  transition: 'left 0.5s ease',
                },
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 24px -10px rgba(102, 126, 234, 0.6)',
                  '&::before': {
                    left: '100%',
                  },
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
              }}
            >
              {isLoggedIn ? "Back to Blogs" : "Take Me Home"}
            </Button>
          </Box>

          {/* Subtle help text */}
          <Typography
            sx={{
              mt: 4,
              fontSize: '0.875rem',
              color: '#999',
              animation: `${fadeInUp} 0.8s ease-out 0.8s both`,
            }}
          >
            Error Code: 404 • Page Not Found
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default NotFound;
