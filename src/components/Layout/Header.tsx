import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useTheme } from '@mui/system';

const Header: React.FC = () => {
  const theme = useTheme();
  
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">Community Page</Typography>
        </Box>
        <Button color="inherit">About</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
