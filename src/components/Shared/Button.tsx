import React from 'react';
import { Button as MUIButton } from '@mui/material';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'contained' | 'outlined';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'contained' }) => {
  return (
    <MUIButton
      variant={variant}
      onClick={onClick}
      sx={{
        padding: '8px 16px',
        fontSize: '1rem',
        marginTop: 2,
        [theme.breakpoints.down('sm')]: {
          width: '100%',
        },
      }}
    >
      {label}
    </MUIButton>
  );
};

export default Button;
