import { createSlice } from "@reduxjs/toolkit";

//로그인이 완료되면 로그인 상태 변경
const initialState = {
  accessToken: "",
  userId: "",
  avatar: "",
  nickName: "",
};

const loginStatus = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export default loginStatus.reducer;
export const { signIn } = loginStatus.actions;
