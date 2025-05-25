import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types";
import posts from "~/assets/data/post.json";

interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload); // adds to top
    },
  },
});

export const { setPosts, addPost } = postSlice.actions;
export default postSlice.reducer;
