import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import postReducer from "./reducers/postReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
