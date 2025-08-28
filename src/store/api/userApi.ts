import { baseApi } from './baseApi';
import { PostResponse } from '@shared/types/postsTypes.ts';
import type { UserType } from '@shared/types/usersType.ts';

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<UserType[], void>({
      query: () => `users`,
    }),
    getPostsUser: build.query<PostResponse[], number>({
      query: (userId) => `posts?userId=${userId}`,
    }),
  }),
});

export const { useGetUsersQuery, useLazyGetPostsUserQuery } = userApi;
