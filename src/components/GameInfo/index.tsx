import { Box, Link, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { GameType } from '../../utils/types/GameType';

export interface GameInfoProps {
  game: GameType
}

export const GameInfo:React.FC<GameInfoProps> = ({
  game
}) => {

  const gameInfo: {[index: string]:any}  = {  
    'Игра': game.name,
    'Описание': game.description,
    'Разработчик' : game.developers.map(d => d.name).join(', '),
    'Издатель' : game.publishers.map(p => p.name).join(', '),
    'Время прохождения': game.gameplayTime,
    'Рейтинг': game.steamScore,
    'Metascore': game.metascore,
    'Проданные копии': game.soldCount,
    'Цена': game.price,
    'Дата релиза': game.releaseDate,
    'Жанры': game.genres.map(g => g.name).join(', '),
    'Теги': game.tags.map(t => t.name).join(', '),
  };
    

  const gameLinks: {[index: string]:any}= {
    'Steam': game.steamURL,
    'HLTB' : game.HLTBURL,
  };


  return (
    <Stack spacing={1}>
      {Object.keys(gameInfo).map(key => 
        <Box 
          key={key + game.id} 
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography  color='secondary' sx={{
            mr: 2,
            flex: '1 1 1px'
          }}>
            {key}
          </Typography>
          <Tooltip title={gameInfo[key]} placement='right'>
            <Typography 
              color='white' 
              noWrap
            >
              {gameInfo[key]}
            </Typography>
          </Tooltip>
        </Box>  

      )}

      {Object.keys(gameLinks).map(key => 
        <Box  
          key={key + game.id}  
          display={'flex'} 
          justifyContent='space-between' 
        >
          <Typography  color='secondary' sx={{
            mr: 2
          }}>
            {key}
          </Typography>
          <Typography color='white' noWrap>
            <Link href={gameLinks[key]}>
              {gameLinks[key]}
            </Link>
          </Typography>
        </Box>  
      )}
    </Stack>

  );
};
