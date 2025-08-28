import { useAppSelector } from '@store/store.ts';

export const selectCurrentUser = () => useAppSelector((state) => state.currentUser.currentUser);
export const selectIsAuth = () => useAppSelector((state) => state.currentUser.isAuth);
