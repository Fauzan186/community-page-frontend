import React, { ReactNode } from 'react';
import { Container, Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container maxWidth={false} disableGutters>
      <Header />
      <Box component="main" sx={{ minHeight: '80vh', py: 3 }}>
        {children}
      </Box>
      <Footer />
    </Container>
  );
};

export default Layout;
