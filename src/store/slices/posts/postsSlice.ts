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
  posts: PostResponse[];
};

export const initialState: InitialStateType = {
  reactions: [],
  posts: [],
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
        post.like = true;
        if (post.like) post.dislike = false;
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
        post.dislike = true;
        if (post.dislike) post.like = false;
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
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<PostResponse>) => {
      state.posts.unshift(action.payload);
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    },
  },
});

export const { toggleFavorite, toggleLike, toggleDislike, addPost, setPosts, deletePost } =
  postsSlice.actions;
