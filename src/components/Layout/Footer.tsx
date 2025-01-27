// src/components/Layout/Footer.tsx
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: 'primary.main', padding: '20px 0' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="body2" color="white" align="center">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
        <Typography variant="body2" color="white" align="center">
          <Link href="#" color="inherit" sx={{ marginRight: 2 }}>
            Privacy Policy
          </Link>
          <Link href="#" color="inherit">
            Terms of Service
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
