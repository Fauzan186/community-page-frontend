import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Comment {
  id: number;
  postId: number;
  body: string;
}

const initialState: Comment[] = [];

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      return action.payload;
    },
  },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
