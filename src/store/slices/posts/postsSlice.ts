import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { PostResponse } from '@shared/types/postsTypes.ts';

type Reaction = {
  idPost: number;
  like: boolean;
  dislike: boolean;
  isFavorite: boolean;
};

type InitialStateType = {
  reactions: Reaction[];
  serverPosts: PostResponse[];
  localPosts: PostResponse[];
};

export const initialState: InitialStateType = {
  reactions: [],
  serverPosts: [],
  localPosts: [],
};

export const postsSlice = createSlice({
  name: 'postsState',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const post = state.reactions.find((p) => p.idPost === action.payload);
      if (post) {
        post.isFavorite = !post.isFavorite;
      } else {
        state.reactions.push({
          idPost: action.payload,
          like: false,
          dislike: false,
          isFavorite: true,
        });
      }
    },
    toggleLike: (state, action: PayloadAction<number>) => {
      const post = state.reactions.find((p) => p.idPost === action.payload);
      if (post) {
        post.dislike = false;
        post.like = !post.like;
      } else {
        state.reactions.push({
          idPost: action.payload,
          like: true,
          dislike: false,
          isFavorite: false,
        });
      }
    },
    toggleDislike: (state, action: PayloadAction<number>) => {
      const post = state.reactions.find((p) => p.idPost === action.payload);
      if (post) {
        post.like = false;
        post.dislike = !post.dislike;
      } else {
        state.reactions.push({
          idPost: action.payload,
          like: false,
          dislike: true,
          isFavorite: false,
        });
      }
    },
    setPosts: (state, action: PayloadAction<PostResponse[]>) => {
      state.serverPosts = [...state.serverPosts, ...action.payload];
    },
    addPost: (state, action: PayloadAction<PostResponse>) => {
      state.localPosts.unshift(action.payload);
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.localPosts = state.localPosts.filter((p) => p.id !== action.payload);
    },
  },
});

export const { toggleFavorite, toggleLike, toggleDislike, addPost, setPosts, deletePost } =
  postsSlice.actions;
