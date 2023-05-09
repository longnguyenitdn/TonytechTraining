import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./reducers/user.slice";
import teamReducer from "./reducers/team.slice";
import projectReducer from "./reducers/project.slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    user: useReducer,
    team: teamReducer,
    project: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
