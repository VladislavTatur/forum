import {configureStore} from '@reduxjs/toolkit'
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {usersSlice} from "./slices/users/usersSlice";
import {userApi} from "./api/userApi";

export const store = configureStore({
    reducer: {
        user: usersSlice.reducer,

        [userApi.reducerPath]: userApi.reducer,
    }, middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()