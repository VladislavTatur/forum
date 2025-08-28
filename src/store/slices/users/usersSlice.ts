import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { LOCAL_STORAGE_AUTH_KEY } from '@features/users/constants';
import type { UserType } from '@shared/types/usersType.ts';

type InitialStateType = {
  currentUser: UserType | null;
  isAuth: boolean;
};

export const initialState: InitialStateType = {
  currentUser: null,
  isAuth: localStorage.getItem(LOCAL_STORAGE_AUTH_KEY) === 'true',
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
      localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, 'true');
    },
    logout: (state) => {
      state.isAuth = false;
      localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, 'false');
    },
    setCurrentUser: (state, action: PayloadAction<UserType | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { login, logout, setCurrentUser } = currentUserSlice.actions;
