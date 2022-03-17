import { configureStore } from '@reduxjs/toolkit';
import wheelSlice from './wheel/wheelSlice';

const store = configureStore({
  reducer: {
    wheel: wheelSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;