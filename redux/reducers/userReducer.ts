import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "John Doe",
  email: "johndoe@gmail.com",
  profilePicture:
    "https://snapynow.com/wp-content/uploads/2024/05/no-dp-pic_23.webp",
  userName: "john_doe",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile(state, action) {
      const { fullName, email, profilePicture, userName } = action.payload;
      state.fullName = fullName;
      state.email = email;
      state.profilePicture = profilePicture;
      state.userName = userName;
    },
    clearProfile(state) {
      state.fullName = "";
      state.email = "";
      state.profilePicture = "";
      state.userName = "";
    },
  },
});

export const { updateProfile, clearProfile } = userSlice.actions;
export default userSlice.reducer;
