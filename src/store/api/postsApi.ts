import {baseApi} from "./baseApi";
import type {PostResponse} from "./types/postsTypes.ts";

export const postsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPosts: build.query<PostResponse[], string>({
            query: (start) => `posts?_limit=10&_start=${start}`
        }),
        getPostById: build.query<PostResponse, number>({
            query: (id)=> `posts/${id}`
        }),
        getPostComments: build.query<PostResponse, number>({
            query: (postId)=> `posts/${postId}/comments`
        })

    })
})

export const {useGetPostsQuery, useGetPostByIdQuery} = postsApi