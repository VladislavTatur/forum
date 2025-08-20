import { baseApi } from './baseApi';
import type { UserType } from '@shared/types/usersType.ts';

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<UserType[], void>({
      query: () => `users`,
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
