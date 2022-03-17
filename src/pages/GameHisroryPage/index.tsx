import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { GameCard } from '../../components/GameCard';
import { useAuthContext } from '../../providers/AuthProvider';
import GamesHistoryService from '../../utils/api/services/GamesHistoryService';
import { GameType } from '../../utils/types/GameType';

export const GameHistoryPage = () => {
  const [games, setGames] = React.useState<GameType[]>([]);
  const {isAuth} = useAuthContext();
  React.useEffect(() => {
    fetchDroppedGames().then(fetchedGames => 
      setGames(fetchedGames)
    );
  }, []);

  const fetchDroppedGames = async () => {
    const { data } = await GamesHistoryService.getGames();
    return data;
  };

  return (
    <Box display={'flex'} flexDirection='column' flex='1 1 1px' >
      <Typography variant='h4'>
      История
      </Typography>
      <Box display='flex'>
        <Container maxWidth={'lg'}>
          {!isAuth &&
                <Typography color={'warning.main'} variant='h5' textAlign={'center'}>
                  Для того, чтобы видеть историю выпавших игр, необходимо зарегистрироваться
                </Typography>
          }
          <Box sx={{
            marginBottom: '360px',
            display: 'flex', 
  
            flex: '1 1 1px',
            p: 2
          }}>

            <Grid container spacing={12} sx={{
            }}>
              
              {games.map(g => 
                <Grid key={g.id} item  sm={12} md={6} lg={6} xl={4}>
                  <GameCard game={g}/>
                </Grid>
              )}
            </Grid>
     
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
