import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userLoggedIn: false,
    uid: "",
    userName: "",
  },
  reducers: {
    setUserLogin: (state, action) => {
      state.userLoggedIn = action.payload;
    },
    setUid: (state, action) => {
      state.uid = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { setUserLogin, setUid, setUserName } = userSlice.actions;
export default userSlice.reducer;
