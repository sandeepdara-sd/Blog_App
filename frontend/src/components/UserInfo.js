import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Button, Card, CardContent, Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { serverURL } from './../helper/Helper';

const UserInfo = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${serverURL}/api/user/${id}`);
        setUser(response.data.user);
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <CircularProgress sx={{ mt: 4 }} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h5" component="div" sx={{ mt: 4 }}>
          Error fetching user details: {error}
        </Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Typography variant="h5" component="div" sx={{ mt: 4 }}>
          No user details available
        </Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #ece9e6, #ffffff)',
        py: 8,
      }}
    >
      <Container>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <Button
            component={Link}
            to="/home"
            variant="contained"
            startIcon={<ArrowBackIcon />}
            sx={{ mr: 2 }}
          >
            Go Back
          </Button>
          <Typography variant="h4">User Details</Typography>
        </Box>
        <Card elevation={6} sx={{ p: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar
                alt={user.name}
                src={user.avatarUrl || '/default-avatar.png'}
                sx={{
                  width: 100,
                  height: 100,
                  mr: 3,
                  border: '2px solid #ccc',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {user.name}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h6"
                component="div"
                color="textSecondary"
                sx={{ fontWeight: 'medium' }}
              >
                Name:
              </Typography>
              <Typography variant="body1">{user.name}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h6"
                component="div"
                color="textSecondary"
                sx={{ fontWeight: 'medium' }}
              >
                Email:
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default UserInfo;
