import likedSlice from './slices/likedSlice/likedSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    likedSlice,
  },
});

export default store;
