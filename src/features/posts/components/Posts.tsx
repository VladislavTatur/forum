import { SyntheticEvent, useEffect, useMemo, useState } from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Tab, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

import { PostsList } from '@features/comments/PostsList.tsx';
import { FilteringPosts } from '@features/posts/components/FilteringPosts.tsx';
import { POSTS_LIMIT } from '@features/posts/constants';
import { PostsTabs } from '@features/posts/enums';
import { CreatePostModal } from '@shared/components/CreatePostModal.tsx';
import { getUserFromStorage } from '@shared/utils/getUserFromStorage.ts';
import { useGetPostsQuery, useSearchForUserPostsQuery } from '@store/api/postsApi.ts';
import { useGetUsersQuery } from '@store/api/userApi.ts';
import { selectLocalPosts, selectReactionsPost } from '@store/selectors/posts.ts';
import { setPosts } from '@store/slices/posts/postsSlice.ts';
import { useAppDispatch } from '@store/store.ts';

export const Posts = () => {
  const dispatch = useAppDispatch();
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
  const [nextScroll, setNextScroll] = useState(0);
  const [activeTab, setActiveTab] = useState<PostsTabs>(PostsTabs.All);
  const [isOpenCreatePostModal, setIsOpenCreatePostModal] = useState(false);

  const localPosts = selectLocalPosts();
  const reactionsPost = selectReactionsPost();

  const { data: posts, isLoading: postsLoading } = useGetPostsQuery(nextScroll);
  const { data: users } = useGetUsersQuery();
  const localUser = getUserFromStorage();
  const allUsers = users && [...users, localUser];
  const selectedUser = allUsers?.find((user) => user.name === selectedUserName);

  const {
    data: userPosts,
    isLoading: userPostsLoading,
    isFetching,
  } = useSearchForUserPostsQuery(selectedUser ? selectedUser.id : 0, {
    skip: !selectedUser,
  });

  const isLoading = userPostsLoading || postsLoading || isFetching;

  const favoritePosts = localPosts.filter((lPost) =>
    reactionsPost.some((rPost) => rPost.idPost === lPost.id && rPost.isFavorite)
  );

  const handleChange = (_: SyntheticEvent, newValue: PostsTabs) => {
    setActiveTab(newValue);
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

  const hasMore = useMemo(() => {
    if (!selectedUserName) {
      return (posts?.length || 0) % POSTS_LIMIT === 0 && posts?.length !== 0;
    }
    if (selectedUserName && userPosts) {
      return false;
    }
    return false;
  }, [selectedUserName, posts, userPosts]);

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
      <Stack direction="row" gap={1} sx={{ justifyContent: 'space-between', padding: 2.5 }}>
        <Typography variant="h5">Посты</Typography>
        <FilteringPosts users={users ?? []} onFilterChange={(value) => filterChangeHandle(value)} />
        <Button
          variant="contained"
          size="small"
          onClick={() => setIsOpenCreatePostModal((prev) => !prev)}
        >
          Создать пост
        </Button>
        <CreatePostModal isOpen={isOpenCreatePostModal} setIsOpen={setIsOpenCreatePostModal} />
      </Stack>
      <Box sx={{ width: 1 }}>
        <TabContext value={activeTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              <Tab label="Все" value={PostsTabs.All} />
              <Tab
                label="Избранное"
                value={PostsTabs.Favorites}
                disabled={favoritePosts.length === 0}
              />
            </TabList>
          </Box>
          <TabPanel value={PostsTabs.All}>
            {isLoading && <Typography variant="body2">Loading...</Typography>}
            {!isLoading && (
              <PostsList
                allUsers={allUsers}
                posts={filteredPosts}
                hasMore={hasMore}
                loadMore={() => setNextScroll((prev) => prev + POSTS_LIMIT)}
              />
            )}
          </TabPanel>
          <TabPanel value={PostsTabs.Favorites}>
            <PostsList posts={favoritePosts} allUsers={allUsers} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};
