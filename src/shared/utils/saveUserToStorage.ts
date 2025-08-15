import type {User} from "../../store/slices/users/usersSliceType.ts";

export const USER_KEY = 'currentUser';

export const saveUserToStorage = (user: User) => {
    try {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
        console.error('Ошибка сохранения пользователя:', error);
    }
};