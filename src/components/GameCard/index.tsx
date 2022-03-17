import { Box, Button } from '@mui/material';
import React from 'react';
import { GameType } from '../../utils/types/GameType';
import { GameInfo } from '../GameInfo';
import styles from './GameCard.module.scss';

interface GameCardProps {
    game: GameType
}

export const GameCard:React.FC<GameCardProps> = ({
  game
}) => {

  return (
    <Box sx={{
      width: '350px',
      height: '200px',
    }}>
      <Button 
        href={game.steamURL}
        className={styles.gameCard} 
        sx={{
          p: 0,
          position: 'relative',
          display: 'flex',
        }}>
        
        <Box
          sx={{
            backgroundImage: `url(${game.imageURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '350px',
            height: '200px',  
            zIndex: -1     
          }} />
      </Button>
      <Box 
        className={styles.gameInfoAnimation}
        sx={{
          backgroundColor: 'rgba(16, 16, 16, 0.8)',
          backdropFilter: 'blur(4px)',
          p: 1,
          position: 'absolute',
          width: '350px',
        }}>
        <GameInfo game={game}/>
      </Box>
 

    </Box>  
  );
};
