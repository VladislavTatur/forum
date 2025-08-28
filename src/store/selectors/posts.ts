import { useAppSelector } from '@store/store.ts';

export const selectPosts = () => useAppSelector((state) => state.postsSlice);

export const selectLocalPosts = () => useAppSelector((state) => state.postsSlice.localPosts);
export const selectServerPosts = () => useAppSelector((state) => state.postsSlice.serverPosts);

export const selectReactionsPost = () => useAppSelector((state) => state.postsSlice.reactions);
