import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Components
const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '200px',
  padding: theme.spacing(4),
}));

const LoadingText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.text.secondary,
  fontWeight: 500,
  fontSize: '1rem',
}));

const Loading = ({ message = "Loading..." }) => {
  return (
    <LoadingContainer>
      <CircularProgress 
        size={48}
        thickness={4}
        sx={{
          color: 'primary.main',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }}
      />
      <LoadingText variant="body1">
        {message}
      </LoadingText>
    </LoadingContainer>
  );
};

export default Loading;
