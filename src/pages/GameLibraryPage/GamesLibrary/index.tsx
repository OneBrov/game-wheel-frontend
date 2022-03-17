import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { useGamesQueryContext } from '../../../providers/GamesQueryContext';
import GamesService from '../../../utils/api/services/GamesService';
import { GameType } from '../../../utils/types/GameType';
import { GamesList } from './GamesList';

const maxCount = 15;

export const GamesLibrary: React.FC = ({
}) => {

  const [page, setPage] = React.useState<number>(-1);
  const [games, setGames] = React.useState<GameType[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [hasMore, setHasMore] = React.useState<boolean>(true);
  const loader = React.useRef(null);

  const gamesQueryCtx = useGamesQueryContext();
  const gamesParams = gamesQueryCtx?.params || '';

  React.useEffect(() => {
    if (!hasMore || isLoading) return; 
    getGamesPage();
  }, [page]);

  React.useEffect(() => {
    if (gamesParams.length ) {
      replaceGames();
    }
  }, [gamesQueryCtx?.params]);

  const replaceGames = async () => {
    if (page === -1) return;
    setPage(0);
    const games = await fetchGamesData(0, maxCount);
    setGames(games);
  };

  const getGamesPage = async() =>{
    console.log('get page');
    
    const games = await fetchGamesData(page || 0, maxCount);
    setGames(prev => [...prev, ...games]);
  };

  const fetchGamesData = async (gamePage: number, maxCount:number) => {
    console.log('fetch');
    
    setIsLoading(true);
    const offset = gamePage * maxCount;
    const { data } = await GamesService.getGames(gamesParams, offset, maxCount);
    if (data.length === 0) {
      setHasMore(false);
    }  else {
      setHasMore(true);
    }
    setIsLoading(false);
    return data;
  };

  const handleObserver = React.useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  React.useEffect(() => {
    const option = {
      root: null,
      rootMargin: '199px',
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <Container maxWidth={'lg'} sx={{ minHeight: '100vh' }}>
      <Box sx={{
        marginBottom: '360px',
        display: 'flex', 
        flex: '1 1 1px',
        p: 2
      }}>
        <GamesList games={games}/>
      </Box>
      <Typography 
        ref={loader}
        marginBottom={20} 
        color='primary' 
        textAlign={'center'} 
        variant='h5' 
      > 
        {!hasMore ? 'Больше игр не найдено!' : 'Загрузка...' } 
    
      </Typography>
    </Container>
  );
};
