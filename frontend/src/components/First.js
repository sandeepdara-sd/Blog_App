import React from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
  Box,
  Container,
  Paper,
  Chip,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ArrowForward as ArrowForwardIcon,
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Palette as PaletteIcon
} from '@mui/icons-material';
import SwipeableTextMobileStepper from './SwipeableTextMobileStepper';

// Styled Components - Enhanced
const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  backgroundSize: '200% 200%',
  animation: 'gradientShift 8s ease infinite',
  color: 'white',
  padding: theme.spacing(10, 0),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.4,
    animation: 'float 20s ease-in-out infinite',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
    transform: 'translate(-50%, -50%)',
    animation: 'pulse 4s ease-in-out infinite',
  },
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: '4rem',
  fontWeight: 900,
  marginBottom: theme.spacing(4),
  background: 'linear-gradient(45deg, #ffffff, #f0f0f0, #ffffff)',
  backgroundSize: '200% 200%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 8px 32px rgba(0,0,0,0.2)',
  animation: 'gradientShift 3s ease infinite',
  fontFamily: "'Outfit', sans-serif",
  letterSpacing: '-0.02em',
  [theme.breakpoints.down('md')]: {
    fontSize: '3rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  marginBottom: theme.spacing(6),
  opacity: 0.95,
  maxWidth: '700px',
  margin: '0 auto',
  lineHeight: 1.8,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontWeight: 500,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
  color: 'white',
  padding: theme.spacing(2.5, 5),
  borderRadius: theme.spacing(4),
  fontSize: '1.2rem',
  fontWeight: 700,
  textTransform: 'none',
  boxShadow: '0 12px 35px rgba(238, 90, 36, 0.4)',
  transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: "'Outfit', sans-serif",
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
    background: 'linear-gradient(135deg, #ee5a24, #d63031)',
    transform: 'translateY(-5px) scale(1.05)',
    boxShadow: '0 20px 50px rgba(238, 90, 36, 0.6)',
    '&::before': {
      left: '100%',
    },
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  overflow: 'hidden',
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
    transform: 'translateY(-12px) scale(1.03)',
    boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(3),
  background: 'linear-gradient(135deg, #667eea, #764ba2)',
  color: 'white',
  fontSize: '2rem',
  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
  transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  '&:hover': {
    transform: 'scale(1.1) rotate(5deg)',
    boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)',
  },
}));

const ContentSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
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

const ImageGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(8),
}));

const StyledImageCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '&:hover': {
    transform: 'scale(1.05) rotate(1deg)',
    boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
  },
}));

const First = () => {
  const features = [
    {
      icon: <TrendingUpIcon />,
      title: 'Trending Content',
      description: 'Stay ahead with the latest trending topics and insights'
    },
    {
      icon: <SecurityIcon />,
      title: 'Secure Platform',
      description: 'Your content is protected with enterprise-grade security'
    },
    {
      icon: <SpeedIcon />,
      title: 'Lightning Fast',
      description: 'Experience blazing fast performance and smooth interactions'
    },
    {
      icon: <PaletteIcon />,
      title: 'Beautiful Design',
      description: 'Modern, responsive design that looks great on all devices'
    }
  ];

  const images = [
    'https://img.freepik.com/premium-photo/business-concept-text-start-blog-white-board-with-paper-clips-wooden-table-background_406607-3944.jpg?size=626&ext=jpg&ga=GA1.1.1122057081.1697127890&semt=ais',
    'https://img.freepik.com/premium-photo/notebook-with-toolls-notes-about-blog-concept_132358-752.jpg?size=626&ext=jpg&ga=GA1.1.1122057081.1697127890&semt=ais',
    'https://img.freepik.com/premium-photo/view-desktop-with-coffee-laptop_325774-1964.jpg?size=626&ext=jpg&ga=GA1.1.1122057081.1697127890&semt=ais',
    'https://img.freepik.com/free-photo/business-branding-label-chart-graphic_53876-133806.jpg?size=626&ext=jpg&ga=GA1.1.1122057081.1697127890&semt=ais',
  ];

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <HeroTitle variant="h1" className="bounce-in">
            Welcome to the Blogging World
          </HeroTitle>
          <HeroSubtitle variant="h5" className="slide-up">
            Discover, create, and share amazing content with our powerful blogging platform.
            Join thousands of creators who are already sharing their stories with the world.
          </HeroSubtitle>

          <Box mt={6} className="slide-up">
            <StyledButton
              component="a"
              href="/signup"
              size="large"
              endIcon={<ArrowForwardIcon />}
            >
              Get Started Today
            </StyledButton>
          </Box>
        </Container>
      </HeroSection>

      {/* Carousel Section */}
      <Box py={8} className="fade-in">
        <Container maxWidth="lg">
          <Typography variant="h3" textAlign="center" mb={6} color="primary" fontFamily="'Outfit', sans-serif" fontWeight="800">
            Featured Stories
          </Typography>
          <SwipeableTextMobileStepper />
        </Container>
      </Box>

      {/* Features Section */}
      <ContentSection>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8} position="relative" zIndex={1}>
            <Typography variant="h3" color="primary" mb={3} fontFamily="'Outfit', sans-serif" fontWeight="800">
              Why Choose BLOGGY?
            </Typography>
            <Typography variant="h6" color="text.secondary" maxWidth="700px" mx="auto" fontFamily="'Plus Jakarta Sans', sans-serif">
              Experience the next generation of content creation with our cutting-edge features
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center" position="relative" zIndex={1}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <FeatureCard className="slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  <Box p={5} textAlign="center">
                    <FeatureIcon>
                      {feature.icon}
                    </FeatureIcon>
                    <Typography variant="h6" fontWeight="700" mb={3} fontFamily="'Outfit', sans-serif">
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" fontFamily="'Plus Jakarta Sans', sans-serif">
                      {feature.description}
                    </Typography>
                  </Box>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ContentSection>

      {/* Content Management Section */}
      <Box py={10} className="fade-in">
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography variant="h3" color="primary" mb={4} fontFamily="'Outfit', sans-serif" fontWeight="800">
              Content Management Made Simple
            </Typography>
            <Typography variant="h6" color="text.secondary" maxWidth="900px" mx="auto" lineHeight={1.8} fontFamily="'Plus Jakarta Sans', sans-serif">
              A content management tool (CMT) is a software application designed to facilitate the creation,
              editing, organization, and publication of digital content. It serves as a centralized platform
              for managing various types of content, including text, images, videos, and other multimedia elements.
            </Typography>
          </Box>

          <Paper elevation={0} sx={{
            p: 6,
            borderRadius: 4,
            background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
            border: '1px solid rgba(102, 126, 234, 0.1)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          }}>
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h5" fontWeight="700" mb={4} color="primary" fontFamily="'Outfit', sans-serif">
                  Key Features
                </Typography>
                <Stack spacing={3}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Chip label="✓" color="success" size="medium" sx={{ fontWeight: 'bold' }} />
                    <Typography fontFamily="'Plus Jakarta Sans', sans-serif">User-friendly interface for content creation</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Chip label="✓" color="success" size="medium" sx={{ fontWeight: 'bold' }} />
                    <Typography fontFamily="'Plus Jakarta Sans', sans-serif">Version control and revision tracking</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Chip label="✓" color="success" size="medium" sx={{ fontWeight: 'bold' }} />
                    <Typography fontFamily="'Plus Jakarta Sans', sans-serif">Collaborative editing capabilities</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Chip label="✓" color="success" size="medium" sx={{ fontWeight: 'bold' }} />
                    <Typography fontFamily="'Plus Jakarta Sans', sans-serif">Advanced analytics and reporting</Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="text.secondary" lineHeight={1.8} fontFamily="'Plus Jakarta Sans', sans-serif">
                  Content management tools play a crucial role in maintaining consistency and coherence
                  across digital platforms. They facilitate content scheduling, publishing automation,
                  and provide powerful search and categorization features to help you organize and
                  retrieve information efficiently.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* Image Gallery */}
      <Box py={8} className="fade-in">
        <Container maxWidth="lg">
          <Typography variant="h3" textAlign="center" mb={6} color="primary" fontFamily="'Outfit', sans-serif" fontWeight="800">
            Inspiration Gallery
          </Typography>
          <ImageGrid container spacing={4} justifyContent="center">
            {images.map((image, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StyledImageCard
                  className="slide-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="280"
                      image={image}
                      alt={`inspiration-${index}`}
                      sx={{ objectFit: 'cover' }}
                    />
                  </CardActionArea>
                </StyledImageCard>
              </Grid>
            ))}
          </ImageGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={10} sx={{
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3,
          animation: 'float 25s ease-in-out infinite',
        },
      }}>
        <Container maxWidth="md" position="relative" zIndex={1}>
          <Box textAlign="center" color="white">
            <Typography variant="h3" mb={4} fontWeight="800" fontFamily="'Outfit', sans-serif">
              Ready to Start Your Blogging Journey?
            </Typography>
            <Typography variant="h6" mb={6} sx={{ opacity: 0.95 }} fontFamily="'Plus Jakarta Sans', sans-serif">
              Join thousands of creators and start sharing your stories today
            </Typography>
            <StyledButton
              component="a"
              href="/signup"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #ee5a24, #d63031)',
                }
              }}
            >
              Create Your First Blog
            </StyledButton>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default First;
