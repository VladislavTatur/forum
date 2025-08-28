import { USER_KEY } from './saveUserToStorage.ts';

import type { UserType } from '../types/usersType.ts';

export const getUserFromStorage = (): UserType => {
  const userData = localStorage.getItem(USER_KEY);
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error('User data parsing error:', error);
    }
  }
  return {
    id: new Date().getTime(),
    name: 'Guest',
    username: '',
    email: '',
    password: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: '',
      },
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  };
};
