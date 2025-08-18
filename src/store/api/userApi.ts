import { baseApi } from './baseApi';
import type { User } from '@shared/types/usersSliceType.ts';

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => `users`,
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
