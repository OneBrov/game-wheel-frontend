import { Grid } from '@mui/material';
import React from 'react';
import { GameCard } from '../../../../components/GameCard';
import { GameType } from '../../../../utils/types/GameType';

interface GamesListProps {
  games: GameType[]
}

export const GameItem:React.FC<{g: GameType}> = React.memo(({g}) => {
  return (
    <Grid key={g.id} item sm={12} md={12} lg={6} xl={4}>
      <GameCard game={g}/>
    </Grid>
  );
});

const GamesListComponent: React.FC<GamesListProps> = ({
  games
}) => {
  return  (
    <Grid container spacing={12} >
      {games.map(g => 
        <GameItem key={g.id} g={g}/>
      )}
    </Grid>);
};

const areEqual = (prevProps: any, nextProps: any) => {
  return prevProps.length === nextProps;
};

export const GamesList = React.memo(GamesListComponent, areEqual);
