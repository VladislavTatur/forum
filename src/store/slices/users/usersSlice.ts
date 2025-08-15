import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {User} from "./usersSliceType.ts";




export const initialState: User[] = []

export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUsers: (_, action: PayloadAction<User[]>) => {
            return action.payload;
        },
    }
})

export const {addUsers} = usersSlice.actions;