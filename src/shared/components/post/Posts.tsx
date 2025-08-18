import {useGetPostsQuery} from "../../../store/api/postsApi.ts";
import {Post} from "./Post.tsx";
import {Button, Typography} from "@mui/material";
import {useGetUsersQuery} from "../../../store/api/userApi.ts";
import InfiniteScroll from "react-infinite-scroll-component";
import {useEffect, useState} from "react";
import type {PostResponse} from "../../types/postsTypes.ts";

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
        <>
            <div style={{display: "flex", justifyContent: "space-between", padding: "20px"}}>
                <Typography variant='h6'>Posts</Typography>
                <Button variant='contained' size='small'>Создать пост</Button>
            </div>
            {/*<Tabs>*/}
            {/*    <Tab label='Все' value='1'/>*/}
            {/*    <Tab label='Избранное' value='2'/>*/}
            {/*</Tabs>*/}
            <InfiniteScroll next={() => setNextScroll(prevState => prevState + displayingPosts)}
                            hasMore={(posts?.length || 0) === POSTS_LIMIT} loader={<h4>Loading...</h4>}
                            dataLength={statePosts.length}>
                <div style={{border: "1px solid gray", margin: "10px", borderRadius: "5px"}}>
                    {statePosts && statePosts.map((post) => {
                        let user
                        if (users) {
                            user = users.find(user => user.id === post.userId)
                        }
                        return (
                            <Post key={post.id} title={post.title} body={post.body}
                                  author={user?.name || 'Неизвестный пользователь'} postId={post.id}/>
                        )
                    })}
                </div>
            </InfiniteScroll>

        </>
    )
}