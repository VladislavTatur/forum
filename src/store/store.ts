import { configureStore } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { userApi } from './api/userApi';
import { commentsSlice } from './slices/comments/commentsSlice.ts';
import { postsSlice } from './slices/posts/postsSlice.ts';
import { currentUserSlice } from '@store/slices/users/usersSlice.ts';

export const store = configureStore({
  reducer: {
    postsSlice: postsSlice.reducer,
    comments: commentsSlice.reducer,
    currentUser: currentUserSlice.reducer,

    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
