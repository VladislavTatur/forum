import {baseApi} from "./baseApi";
import type {User} from "../slices/users/usersSliceType.ts";

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<User[], void>({
            query: () => `users`,
        }),
    }),
})

export const { useGetUsersQuery } = userApi