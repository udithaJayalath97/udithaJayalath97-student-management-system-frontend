import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Home, School, Group, Assignment } from '@mui/icons-material';  // Importing icons

function Header() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#3f51b5' }}> {/* Dark blue background */}
      <Toolbar>
        <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
            University Course Management System
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Navigation buttons with icons */}
            <Button
              color="inherit"
              component={Link}
              to="/"
              startIcon={<Home />}
              sx={{
                '&:hover': {
                  backgroundColor: '#303f9f',
                },
              }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/students"
              startIcon={<Group />}
              sx={{
                '&:hover': {
                  backgroundColor: '#303f9f',
                },
              }}
            >
              Students
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/enrollments"
              startIcon={<School />}
              sx={{
                '&:hover': {
                  backgroundColor: '#303f9f',
                },
              }}
            >
              Enrollments
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/results"
              startIcon={<Assignment />}
              sx={{
                '&:hover': {
                  backgroundColor: '#303f9f',
                },
              }}
            >
              Results
            </Button>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
