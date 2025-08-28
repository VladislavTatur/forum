import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Comment, ServerCommentsCountType } from '@shared/types/commentsType.ts';

type CommentsInitialState = {
  serverCommentsCount: ServerCommentsCountType[];
  localComments: Comment[];
};

const initialState: CommentsInitialState = {
  serverCommentsCount: [],
  localComments: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setCommentsCount: (state, { payload }: PayloadAction<ServerCommentsCountType>) => {
      state.serverCommentsCount.push(payload);
    },
    addComment: (state, { payload }: PayloadAction<Comment>) => {
      state.localComments.unshift(payload);
    },
  },
});

export const { setCommentsCount, addComment } = commentsSlice.actions;
