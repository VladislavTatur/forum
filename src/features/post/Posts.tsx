import { SyntheticEvent, useEffect, useMemo, useState } from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Tab, Typography } from '@mui/material';

import { PostsList } from '@features/comments/PostsList.tsx';
import { FilteringPosts } from '@features/post/FilteringPosts.tsx';
import { CreatePostModal } from '@shared/components/CreatePostModal.tsx';
import { getUserFromStorage } from '@shared/utils/getUserFromStorage.ts';
import { useGetPostsQuery, useSearchForUserPostsQuery } from '@store/api/postsApi.ts';
import { useGetUsersQuery } from '@store/api/userApi.ts';
import { selectLocalPosts, selectReactionsPost } from '@store/selectors/posts.ts';
import { setPosts } from '@store/slices/posts/postsSlice.ts';
import { useAppDispatch } from '@store/store.ts';

export const Posts = () => {
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
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
  const selectedUser = allUsers?.find((user) => user.name === selectedUserName);
  const { data: userPosts } = useSearchForUserPostsQuery(selectedUser ? selectedUser.id : 0, {
    skip: !selectedUser, // запрос выполняется только если есть выбранный пользователь
  });
  const [value, setValue] = useState('Все');

  const favoritePosts = localPosts.filter((lPost) =>
    reactionsPost.some((rPost) => rPost.idPost === lPost.id && rPost.isFavorite)
  );

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const filteredPosts = useMemo(() => {
    if (!selectedUserName) return localPosts;
    if (userPosts) return userPosts;
    return localPosts;
  }, [selectedUserName, localPosts, userPosts]);

  const filterChangeHandle = (value: string | null) => {
    if (value) setSelectedUserName(value);
    else setSelectedUserName(null);
  };

  useEffect(() => {
    if (posts?.length) {
      const newPosts = posts.filter((post) => !localPosts.some((p) => p.id === post.id));
      if (newPosts.length) {
        dispatch(setPosts([...localPosts, ...newPosts]));
      }
    }
  }, [posts, dispatch, localPosts]);

  const hasMore = useMemo(() => {
    if (!selectedUserName) {
      return (posts?.length || 0) % POSTS_LIMIT === 0 && posts?.length !== 0;
    }
    if (selectedUserName && userPosts) {
      return false;
    }
    return false;
  }, [selectedUserName, posts, userPosts]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <Typography variant="h5">Посты</Typography>
        <FilteringPosts users={users || []} onFilterChange={(value) => filterChangeHandle(value)} />
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
              posts={filteredPosts}
              hasMore={hasMore}
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
