import { useAppSelector } from '@store/store.ts';

export const selectComments = () => useAppSelector((state) => state.comments.localComments);

export const selectServerCommentsCount = () =>
  useAppSelector((state) => state.comments.serverCommentsCount);
