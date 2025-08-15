import {useGetPostsQuery} from "../../store/api/postsApi.ts";
import {Post} from "./Post.tsx";
import {Card} from "@mui/material";
import {useGetUsersQuery} from "../../store/api/userApi.ts";
import InfiniteScroll from "react-infinite-scroll-component";
import {useEffect, useState} from "react";
import type {PostResponse} from "../../store/api/types/postsTypes.ts";

export const Posts = () => {
    const [nextScroll, setNextScroll] = useState<number>(0);
    const [statePosts, setStatePosts] = useState<PostResponse[]>([]);

    const {data: posts} = useGetPostsQuery(nextScroll.toString())
    const {data: users} = useGetUsersQuery()
    const displayingPosts = 10
    const POSTS_LIMIT = displayingPosts

    useEffect(() => {
        if (posts) {
            setStatePosts(prev => {
                const newPosts = posts.filter(
                    post => !prev.some(p => p.id === post.id)
                );
                return [...prev, ...newPosts];
            });
        }
    }, [posts]);

    return (
        <Card>
            <InfiniteScroll next={() => setNextScroll(prevState => prevState + displayingPosts)}
                            hasMore={(posts?.length || 0) === POSTS_LIMIT} loader={<h4>Loading...</h4>}
                            dataLength={statePosts.length}>
                {statePosts && statePosts.map((post) => {
                    let user
                    if (users) {
                        user = users.find(user => user.id === post.userId)
                    }
                    return (
                        <Post key={post.id} title={post.title} body={post.body}
                              author={user?.name || 'Неизвестный пользователь'}/>
                    )
                })}
            </InfiniteScroll>

        </Card>
    )
}