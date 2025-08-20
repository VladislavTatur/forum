import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { UserType } from '@shared/types/usersType.ts';

export const initialState: UserType[] = [];

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUsers: (_, action: PayloadAction<UserType[]>) => {
      return action.payload;
    },
  },
});

export const { addUsers } = usersSlice.actions;
