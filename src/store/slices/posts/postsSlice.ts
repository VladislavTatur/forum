import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

type InitialStateType = {
    idPost: number,
    like: boolean,
    dislike: boolean,
    isFavorite: boolean,
}

export const initialState: InitialStateType[] = []

export const postsSlice = createSlice({
    name: 'postsState',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<number>) => {
            const post = state.find(p => p.idPost === action.payload);
            if (post) {
                post.isFavorite = !post.isFavorite;
            } else {
                state.push({
                    idPost: action.payload,
                    like: false,
                    dislike: false,
                    isFavorite: true,
                });
            }
        },
        toggleLike: (state, action: PayloadAction<number>) => {
            const post = state.find(p => p.idPost === action.payload);
            if (post) {
                post.like = true;
                if (post.like) post.dislike = false;
            } else {
                state.push({
                    idPost: action.payload,
                    like: true,
                    dislike: false,
                    isFavorite: false
                });
            }
        },
        toggleDislike: (state, action: PayloadAction<number>) => {
            const post = state.find(p => p.idPost === action.payload);
            if (post) {
                post.dislike = true;
                if (post.dislike) post.like = false;
            } else {
                state.push({
                    idPost: action.payload,
                    like: false,
                    dislike: true,
                    isFavorite: false
                });
            }
        },
    }
})

export const {toggleFavorite, toggleLike, toggleDislike} = postsSlice.actions;