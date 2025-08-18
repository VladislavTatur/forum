import { useEffect, useState } from 'react';

import { Button, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Post } from './Post.tsx';
import { CreatePostModal } from '@shared/components/CreatePostModal.tsx';
import type { PostResponse } from '@shared/types/postsTypes.ts';
import { getUserFromStorage } from '@shared/utils/getUserFromStorage.ts';
import { useGetPostsQuery } from '@store/api/postsApi.ts';
import { useGetUsersQuery } from '@store/api/userApi.ts';
import { setPosts } from '@store/slices/posts/postsSlice.ts';
import { useAppDispatch, useAppSelector } from '@store/store.ts';

export const Posts = () => {
  const [nextScroll, setNextScroll] = useState(0);
  const [statePosts, setStatePosts] = useState<PostResponse[]>([]);
  const [isOpenCreatePostModal, setIsOpenCreatePostModal] = useState(false);
  const { data: posts } = useGetPostsQuery(nextScroll);
  const { data: users } = useGetUsersQuery();
  const localPosts = useAppSelector((state) => state.postsSlice.posts);
  const localUser = getUserFromStorage();
  const dispatch = useAppDispatch();
  const allUsers = users && [...users, localUser];
  const POSTS_LIMIT = 10;

  useEffect(() => {
    if (posts?.length) {
      const newPosts = posts.filter((post) => !statePosts.some((p) => p.id === post.id));
      if (newPosts.length) {
        setStatePosts((prev) => [...prev, ...newPosts]);
        dispatch(setPosts([...localPosts, ...newPosts]));
      }
    }
  }, [posts, statePosts, dispatch, localPosts]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <Typography variant="h6">Posts</Typography>
        <Button
          variant="contained"
          size="small"
          onClick={() => setIsOpenCreatePostModal((prev) => !prev)}
        >
          Создать пост
        </Button>
        <CreatePostModal isOpen={isOpenCreatePostModal} setIsOpen={setIsOpenCreatePostModal} />
      </div>
      {/*<Tabs>*/}
      {/*    <Tab label='Все' value='1'/>*/}
      {/*    <Tab label='Избранное' value='2'/>*/}
      {/*</Tabs>*/}
      <InfiniteScroll
        next={() => setNextScroll((prevState) => prevState + POSTS_LIMIT)}
        hasMore={(posts?.length || 0) === POSTS_LIMIT}
        loader={<h4>Loading...</h4>}
        dataLength={statePosts.length}
      >
        <div style={{ border: '1px solid gray', margin: '10px', borderRadius: '5px' }}>
          {localPosts &&
            localPosts.map((post) => {
              const user = allUsers?.find((user) => user.id === post.userId);
              return (
                <Post
                  key={post.id}
                  title={post.title}
                  body={post.body}
                  author={user?.name || 'Неизвестный пользователь'}
                  postId={post.id}
                />
              );
            })}
        </div>
      </InfiniteScroll>
    </>
  );
};
