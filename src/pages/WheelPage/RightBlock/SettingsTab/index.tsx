import { Box } from '@mui/material';
import React from 'react';
import { GameSettings } from '../../../../components/GameSettings';
import { useGamesQueryContext } from '../../../../providers/GamesQueryContext';

export const SettingsTab = () => {
  const gamesQueryCtx = useGamesQueryContext();
  const [gamesQuery, setGamesQuery] = React.useState<string>(gamesQueryCtx?.params || '');

  React.useEffect(() => {
    gamesQueryCtx?.setParams(gamesQuery);
  }, [gamesQuery, gamesQueryCtx]);
  
  return (
    <Box sx={{
      p: 2
    }}>
      <GameSettings setQueryParams={setGamesQuery}/>
    </Box>
  );
};
