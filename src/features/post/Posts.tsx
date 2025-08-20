import { SyntheticEvent, useEffect, useState } from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Tab, Typography } from '@mui/material';

import { PostsList } from '@features/comments/PostsList.tsx';
import { FilteringPosts } from '@features/post/FilteringPosts.tsx';
import { CreatePostModal } from '@shared/components/CreatePostModal.tsx';
import { getUserFromStorage } from '@shared/utils/getUserFromStorage.ts';
import { useGetPostsQuery } from '@store/api/postsApi.ts';
import { useGetUsersQuery } from '@store/api/userApi.ts';
import { selectLocalPosts, selectReactionsPost } from '@store/selectors/posts.ts';
import { setPosts } from '@store/slices/posts/postsSlice.ts';
import { useAppDispatch } from '@store/store.ts';

export const Posts = () => {
  const [nextScroll, setNextScroll] = useState(0);
  const [isOpenCreatePostModal, setIsOpenCreatePostModal] = useState(false);
  const { data: posts } = useGetPostsQuery(nextScroll);
  const { data: users } = useGetUsersQuery();
  const localPosts = selectLocalPosts();
  const reactionsPost = selectReactionsPost();
  const localUser = getUserFromStorage();
  const dispatch = useAppDispatch();
  const allUsers = users && [...users, localUser];
  const POSTS_LIMIT = 10;

  const [value, setValue] = useState('Все');

  const favoritePosts = localPosts.filter((lPost) =>
    reactionsPost.some((rPost) => rPost.idPost === lPost.id && rPost.isFavorite)
  );

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (posts?.length) {
      const newPosts = posts.filter((post) => !localPosts.some((p) => p.id === post.id));
      if (newPosts.length) {
        dispatch(setPosts([...localPosts, ...newPosts]));
      }
    }
  }, [posts, dispatch, localPosts]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <Typography variant="h5">Посты</Typography>
        <FilteringPosts users={users} />
        <Button
          variant="contained"
          size="small"
          onClick={() => setIsOpenCreatePostModal((prev) => !prev)}
        >
          Создать пост
        </Button>
        <CreatePostModal isOpen={isOpenCreatePostModal} setIsOpen={setIsOpenCreatePostModal} />
      </div>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              <Tab label="Все" value="Все" />
              <Tab label="Избранное" value="Избранное" />
            </TabList>
          </Box>
          <TabPanel value="Все">
            <PostsList
              allUsers={allUsers}
              posts={localPosts}
              hasMore={(posts?.length || 0) === POSTS_LIMIT}
              loadMore={() => setNextScroll((prev) => prev + POSTS_LIMIT)}
            />
          </TabPanel>
          <TabPanel value="Избранное">
            <PostsList posts={favoritePosts} allUsers={allUsers} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};
