import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { NavBar } from './NavBar';

export const AppLayout:React.FC = ({}) => {
  return (
    <Box 
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%'
      }}
    >
      <NavBar />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1',
        padding: 2
      }}>
        <Box 
          component={'main'} 
          sx={{
            display: 'flex', 
            maxWidth:'100%',  
            flex: '1 1 1px',
          }}
        >
          <Outlet />
        </Box>
        <Box sx={{ flex: '0 1' }} >
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};
