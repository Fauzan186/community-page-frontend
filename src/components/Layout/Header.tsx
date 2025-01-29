import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header: React.FC = () => {
  
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
