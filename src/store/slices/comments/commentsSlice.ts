import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Comment} from "../../../shared/types/commentsType.ts";

type CommentsInitialState = {
    data: Comment[]
}

const initialState:CommentsInitialState = {
    data: []
}

export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        addComment: (state, {payload}: PayloadAction<Comment[]>) => {
            state.data = payload;
        }
    }
})

export const {addComment} = commentsSlice.actions;