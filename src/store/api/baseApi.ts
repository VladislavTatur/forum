import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'forumApi',
  baseQuery: async (args, api, extraOptions) => {
    return fetchBaseQuery({
      baseUrl: 'https://jsonplaceholder.typicode.com/',
    })(args, api, extraOptions);
  },
  endpoints: () => ({}),
});
