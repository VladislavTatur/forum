import { useEffect, useMemo } from 'react';

import { getUserFromStorage } from '@shared/utils/getUserFromStorage.ts';
import { useGetPostsQuery, useSearchForUserPostsQuery } from '@store/api/postsApi.ts';
import { useGetUsersQuery } from '@store/api/userApi.ts';
import {
  selectLocalPosts,
  selectReactionsPost,
  selectServerPosts,
} from '@store/selectors/posts.ts';
import { setPosts } from '@store/slices/posts/postsSlice.ts';
import { useAppDispatch } from '@store/store.ts';

export const usePostsData = (selectedUserName: string | null) => {
  const dispatch = useAppDispatch();
  const localPosts = selectLocalPosts();
  const reactionsPost = selectReactionsPost();
  const serverPosts = selectServerPosts();

  const { data: posts, isLoading: postsLoading } = useGetPostsQuery();
  const { data: users } = useGetUsersQuery();
  const localUser = getUserFromStorage();
  const allUsers = users && [...users, localUser];
  const selectedUser = allUsers?.find((u) => u.name === selectedUserName);

  const {
    data: userPosts,
    isLoading: userPostsLoading,
    isFetching,
  } = useSearchForUserPostsQuery(selectedUser?.id ?? 0, { skip: !selectedUser });

  const allPosts = useMemo(() => [...localPosts, ...serverPosts], [localPosts, serverPosts]);
  const isLoading = postsLoading || userPostsLoading || isFetching;

  const favoritePosts = useMemo(() => {
    const favorites = allPosts.filter((post) =>
      reactionsPost.some((r) => r.idPost === post.id && r.isFavorite)
    );
    if (!selectedUserName) return favorites;
    if (userPosts) return favorites.filter((p) => userPosts.some((up) => up.id === p.id));
    return favorites;
  }, [allPosts, reactionsPost, selectedUserName, userPosts]);

  const filteredPosts = useMemo(() => {
    if (!selectedUserName) return allPosts;
    if (userPosts) return userPosts;
    return allPosts;
  }, [selectedUserName, allPosts, userPosts]);

  useEffect(() => {
    if (posts?.length) {
      const existIds = new Set(serverPosts.map((p) => p.id));
      const newPosts = posts.filter((p) => !existIds.has(p.id));
      if (newPosts.length) {
        dispatch(setPosts(newPosts));
      }
    }
  }, [posts, serverPosts, dispatch]);

  return { allUsers, filteredPosts, favoritePosts, isLoading };
};
