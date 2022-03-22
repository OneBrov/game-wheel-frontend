import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { useGamesQueryContext } from '../../../providers/GamesQueryContext';
import { 
  addWheelRotate, 
  deleteWinner, 
  resetWheelRotate, 
  setGames, 
  setWinnerByDegree 
} from '../../../store/wheel/wheelSlice';
import GamesService from '../../../utils/api/services/GamesService';
import { MemoWheel } from './Wheel';
import styles from './LeftBlock.module.scss';
import { useDebouncedEffect } from '../../../hooks/useDebounceEffect';
import GamesHistoryService from '../../../utils/api/services/GamesHistoryService';
import { useAuthContext } from '../../../providers/AuthProvider';
import { WheelSkeleton } from './WheelSkeleton';


export const LeftBlock = () => {

  const [isSpinning, setIsSpinning] = React.useState<boolean>(false);
  const [wheelIsLoading, setWheelIsLoading] = React.useState<boolean>(true);  
  const gamesQueryCtx = useGamesQueryContext();
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const { isAuth } = useAuthContext();
  const dispatch = useAppDispatch();
  const { winner, wheelRotate, rotateDuration, games } = useAppSelector(state => state.wheel);

  React.useEffect(() => {
    dispatch(deleteWinner());
    dispatch(resetWheelRotate());
    dispatch(setGames([]));
    return () => {
      dispatch(deleteWinner());
      dispatch(resetWheelRotate());
      dispatch(setGames([]));
    };
  }, []);

  React.useEffect(() => {
    dispatch(deleteWinner());
    rotateWheelToDefault();
    loadGames();
  }, [gamesQueryCtx?.params]);

  React.useEffect(() => {
    if (winner && (wheelRotate > 0) && isAuth ) {
      GamesHistoryService.createDroppedGame(winner.id);
    }
  }, [winner, wheelRotate]);

  React.useEffect(() => {
    if (wheelRef?.current){
      wheelRef.current.style.transition = `transform cubic-bezier(0, 0, 0.1, 1) ${rotateDuration}ms` ;
      wheelRef.current.style.transform = `rotate(${wheelRotate}deg)`;
    }
  }, [wheelRotate]);


  //after $rotateDuration get winner game, and unlock spin button
  useDebouncedEffect(()=>{
    setIsSpinning(false);
    dispatch(setWinnerByDegree(wheelRotate));
  }, [wheelRotate], rotateDuration);

  const loadGames = async () => {
    setWheelIsLoading(true);
    const { data } = await GamesService.getRandomGames(gamesQueryCtx?.params || '');
    dispatch(resetWheelRotate());
    dispatch(setGames(data));
    setWheelIsLoading(false);
  };

  const handleClickSpin = async () => {
    setIsSpinning(true);

    const max = 5040;
    const min = 3600;
    rotateWheelToDefault();
    if (winner) {
      dispatch(deleteWinner());
    }
    const randomRotate = Math.random() * (max - min) + min;
    await loadGames();
    dispatch(addWheelRotate(randomRotate));
  };

  const rotateWheelToDefault = () => {
    if (wheelRef?.current) {
      wheelRef.current.style.transition  = 'transform cubic-bezier(0, 0, 0.1, 1) 1ms' ;
      wheelRef.current.style.transform  = 'rotate(0)' ;
    }
  };


  return (
    <Box  
     
      sx={{
        display: 'flex',
        justifyContent: 'center'
      }}>
      <Box 
        
        className={styles.wheel}
        sx={{
          position: 'relative',
          overflow: 'hidden'
        }}
       
      >
        <Box ref={wheelRef}   
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          {wheelIsLoading 
            ? <WheelSkeleton />
            : <>
              <MemoWheel games={games}/>
              <Button 
                className={styles.spinButton}
                onClick={handleClickSpin}
                variant='contained'
                disabled={isSpinning}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50px',
                  height: '100px',
                  width: '100px',
                  border: '2px solid white'
                }} 
              > 
                <Typography 
                  color='white'
                >
              Крутить
                </Typography>
              </Button>
            </>
          }
        </Box>
        <Box className={styles.winnerPointer}/>   
      </Box>
    </Box>
  );
};

