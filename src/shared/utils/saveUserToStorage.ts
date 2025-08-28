import type { UserType } from '../types/usersType.ts';

export const USER_KEY = 'currentUser';

export const saveUserToStorage = (user: UserType) => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('User Save error:', error);
  }
};
