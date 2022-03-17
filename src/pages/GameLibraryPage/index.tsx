import { Box, Typography } from '@mui/material';
import React from 'react';
import { DarkBackground } from '../../components/DarkBackground';
import { GameSettings } from '../../components/GameSettings';
import { useGamesQueryContext } from '../../providers/GamesQueryContext';
import { GamesLibrary } from './GamesLibrary';

export const GameLibraryPage = () => {
  const gamesQueryCtx = useGamesQueryContext();
  const setParams = (params: string) => {
    gamesQueryCtx?.setParams(params);
  };

  React.useEffect(() => {
    gamesQueryCtx?.setParams('');
  }, []);
  
  return (
    <Box display={'flex'} flexDirection='column' flex='1 1 1px' >
      <Typography variant='h4'>
        Библиотека
      </Typography>
      <Box display='flex'>
        
        <GamesLibrary />
    
        <Box sx={{
          width: '500px',
          height: '500px',
          p: 2
        }}>
          <DarkBackground>
            <Box sx={{
              p: 2
            }}>
              <Typography variant='h5' sx={{
                mb: 2
              }}>
                Настройки поиска
              </Typography>
              <GameSettings withGameName setQueryParams={setParams}/>
            </Box>
          </DarkBackground>
        </Box>

      </Box>
    </Box>
  );
};
