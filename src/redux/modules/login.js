import { createSlice } from "@reduxjs/toolkit";

const openLoginToggle = createSlice({
  name: "openRegisterLoginToggle",
  initialState: true,
  reducers: {
    changeBooleanState: (state, action) => {
      return action.payload;
    },
  },
});

export default openLoginToggle.reducer;
export const { changeBooleanState } = openLoginToggle.actions;
