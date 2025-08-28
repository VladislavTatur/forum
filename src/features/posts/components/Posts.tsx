import { useEffect, useState } from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Stack, Tab, Typography, Tooltip } from '@mui/material';

import { CreatePostModal } from '@features/posts/components/CreatePostModal.tsx';
import { FilteringPosts } from '@features/posts/components/FilteringPosts.tsx';
import { PostsList } from '@features/posts/components/PostsList.tsx';
import { POSTS_LIMIT } from '@features/posts/constants';
import { PostsTabs } from '@features/posts/enums';
import { usePostsData } from '@features/posts/hooks/usePostsData.ts';
import { usePagination } from '@shared/hooks/usePagination.ts';
import { UserType } from '@shared/types/usersType.ts';
import { selectIsAuth } from '@store/selectors/users.ts';

export const Posts = () => {
  const isAuth = selectIsAuth();
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<PostsTabs>(PostsTabs.All);
  const [isOpenCreatePostModal, setIsOpenCreatePostModal] = useState(false);

  const { allUsers, filteredPosts, favoritePosts, isLoading } = usePostsData(selectedUserName);
  const postsPagination = usePagination(filteredPosts, POSTS_LIMIT);
  const favoritesPagination = usePagination(favoritePosts, POSTS_LIMIT);

  const handleFilterChange = (user: UserType | null) => {
    setSelectedUserName(user ? user.name : null);
    postsPagination.setPage(1);
  };

  useEffect(() => {
    if (favoritePosts.length === 0) {
      setActiveTab(PostsTabs.All);
    }
  }, [favoritePosts]);

  return (
    <>
      <Stack
        direction="row"
        gap={1}
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: 2.5 }}
      >
        <Typography variant="h5">Posts</Typography>
        <FilteringPosts users={allUsers ?? []} onFilterChange={handleFilterChange} />
        <Box>
          <Tooltip title={isAuth ? '' : 'You must be logged in to create a post'}>
            <span>
              <Button
                variant="contained"
                onClick={() => setIsOpenCreatePostModal(true)}
                disabled={!isAuth}
              >
                Create post
              </Button>
            </span>
          </Tooltip>
        </Box>
        <CreatePostModal isOpen={isOpenCreatePostModal} setIsOpen={setIsOpenCreatePostModal} />
      </Stack>

      <Box sx={{ width: 1 }}>
        <TabContext value={activeTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={(_, val) => setActiveTab(val)}>
              <Tab label="All" value={PostsTabs.All} />
              <Tab
                label="Favorite"
                value={PostsTabs.Favorites}
                disabled={!isAuth || !favoritePosts.length}
              />
            </TabList>
          </Box>

          <TabPanel value={PostsTabs.All}>
            {isLoading ? (
              <Typography variant="body2">Loading...</Typography>
            ) : (
              <PostsList
                allUsers={allUsers}
                posts={postsPagination.paginated}
                count={postsPagination.count}
                page={postsPagination.page}
                onPageChange={(_, v) => postsPagination.setPage(v)}
              />
            )}
          </TabPanel>

          <TabPanel value={PostsTabs.Favorites}>
            <PostsList
              allUsers={allUsers}
              posts={favoritesPagination.paginated}
              count={favoritesPagination.count}
              page={favoritesPagination.page}
              onPageChange={(_, v) => favoritesPagination.setPage(v)}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};
