import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue color
    },
    secondary: {
      main: '#f50057', // Pink color
    },
  },
  breakpoints: {
    values: {
      xs: 0,   // Phone
      sm: 600, // Tablet
      md: 960, // Laptop
      lg: 1280, // Desktop
      xl: 1920, // Large Desktop
    },
  },
  typography: {
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 400,
    },
  },
});

export default theme;
