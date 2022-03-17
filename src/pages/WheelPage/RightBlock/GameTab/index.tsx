import { Box, Typography } from '@mui/material';
import React from 'react';
import { GameInfo } from '../../../../components/GameInfo';
import { useAppSelector } from '../../../../hooks/reduxHooks';

export const GameTab = () => {
  const { winner } = useAppSelector(state => state.wheel);

  return (
    <Box sx={{
      p: 2
    }}>
      {winner ?
        <>
          <Box sx={{
            display: 'flex', 
            justifyContent: 'center', 
            p: 1
          }}>
            <img src={winner.imageURL} alt='game'/>
          </Box>
          <GameInfo game={winner}/> 
        </>
        :
        <Typography>
          Здесь будет находиться выпавшая игра
        </Typography>
      }
    
    </Box>
  );
};
