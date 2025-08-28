import { baseApi } from './baseApi';
import type { Comment } from '@shared/types/commentsType.ts';
import type { PostRequest, PostResponse } from '@shared/types/postsTypes.ts';

export const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<PostResponse[], void>({
      query: () => `posts`,
    }),
    getPostById: build.query<PostResponse, string>({
      query: (id) => `posts/${id}`,
    }),
    getPostComments: build.query<Comment[], number>({
      query: (postId) => `posts/${postId}/comments`,
    }),
    createPost: build.mutation<PostResponse, PostRequest>({
      query: (newPost: PostRequest) => ({
        url: 'posts',
        method: 'POST',
        body: newPost,
      }),
    }),
    searchForUserPosts: build.query<PostResponse[], number>({
      query: (idUser) => `posts/?userId=${idUser}`,
    }),
  }),
});

export const {
  useGetPostsQuery,
  useLazyGetPostByIdQuery,
  useGetPostByIdQuery,
  useGetPostCommentsQuery,
  useCreatePostMutation,
  useSearchForUserPostsQuery,
} = postsApi;
