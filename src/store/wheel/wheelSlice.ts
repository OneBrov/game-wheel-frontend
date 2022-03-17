import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameType } from '../../utils/types/GameType';


// Define a type for the slice state
interface WheelState {
  games: GameType[];   // pull of games 
  wheelRotate: number;  // final wheel rotate amount
  winner: GameType | undefined;
  rotateDuration: number
}

const initialState:  WheelState = {
  games: [],      
  wheelRotate: 0,  
  winner: undefined,
  rotateDuration: 10000
};

export const wheelSlice = createSlice({
  name: 'wheel',
  initialState,
  reducers: {
    setWinnerByDegree: (state, action: PayloadAction<number>) => {
      const currentRotate = action.payload;
      const games = state.games;
      const winnerIndex = ( ~~(currentRotate % 360 / (360 / games.length)) );
      
      state.winner = games[winnerIndex];
    },
    deleteWinner: (state) => {
      state.winner = undefined;
    },

    addWheelRotate: (state, action: PayloadAction<number>) => {
      state.wheelRotate += action.payload;
    },
    resetWheelRotate: (state) => {
      state.wheelRotate = 0;
    },
    setGames: (state, action: PayloadAction<GameType[]>) => {
      state.games = action.payload;
    },
  },
});

export const { setWinnerByDegree, deleteWinner, addWheelRotate, resetWheelRotate, setGames } = wheelSlice.actions;

export default wheelSlice.reducer;