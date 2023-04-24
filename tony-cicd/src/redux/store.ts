import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./reducers/user.slice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    user: useReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export default store;
