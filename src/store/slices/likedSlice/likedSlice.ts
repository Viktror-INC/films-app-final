import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likedAnime: [] as { title: string; id: number }[],
};

const likedSlice = createSlice({
  name: 'indexFromStore',
  initialState,
  reducers: {
    setLikedAnime: (state, action) => {
      state.likedAnime = action.payload;
    },
  },
});

export const { setLikedAnime } = likedSlice.actions;
export default likedSlice.reducer;
