import { USER_KEY } from './saveUserToStorage.ts';

import type { User } from '../types/usersSliceType.ts';

export const getUserFromStorage = (): User => {
  const userData = localStorage.getItem(USER_KEY);
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error('Ошибка парсинга данных пользователя:', error);
    }
  }
  return {
    id: new Date().getTime(),
    name: 'Guest',
    username: '',
    email: '',
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
