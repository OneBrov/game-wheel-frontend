import { Box, Link, Typography } from '@mui/material';
import React from 'react';

export const Footer:React.FC = () => {
  return (
    <Box 
      component={'footer'} 
      sx={{
        flex: '1 1',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Box display={'flex'} >
        <Typography color={'primary'}>
            Автор:{' '}
          <Typography color={'white'} component={'span'}>
            Данил Евдокимов
          </Typography>
        </Typography>
        <Link 
          href='https://github.com/OneBrov/game-wheel-frontend'
          sx={{
            marginLeft: '50px'
          }}
        >
         Источник кода
        </Link>
      </Box>
    </Box>
  );
};
