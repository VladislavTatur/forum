import type {User} from "../../store/slices/users/usersSliceType.ts";
import {USER_KEY} from "./saveUserToStorage.ts";

export const getUserFromStorage = (): User | null => {
    const userData = localStorage.getItem(USER_KEY);
    if (userData) {
        try {
            return JSON.parse(userData);
        } catch (error) {
            console.error('Ошибка парсинга данных пользователя:', error);
            return null;
        }
    }
    return null;
};