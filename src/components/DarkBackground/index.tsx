import { Box } from '@mui/material';
import React from 'react';

export const DarkBackground:React.FC = ({
  children
}) => {
  return (
    <Box sx={{
      backgroundColor: '#16161A',
      flex: '1 1 1px'
    }}>
      {children}
    </Box>
  );
};
