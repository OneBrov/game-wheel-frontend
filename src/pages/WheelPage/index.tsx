import { Box, Typography } from '@mui/material';
import React from 'react';
import { GamesQueryProvider } from '../../providers/GamesQueryContext';
import { LeftBlock } from './LeftBlock';
import { RightBlock } from './RightBlock';

export const WheelPage = () => {

  return (
    <GamesQueryProvider>
      <Box sx={{
        display: 'flex', flex: '1 1 1px'
      }}>
        <Box sx={{
          flex: '1 1 1px',
       
        }}>
          <Typography variant='h4'>
          Колесо
          </Typography>
          <LeftBlock />
        </Box>
        <Box sx={{
          flex: '0 1 1px',
        }}>
          <RightBlock />
        </Box>
      </Box>
    </GamesQueryProvider>
  );
};
