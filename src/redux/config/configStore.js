import letters from "redux/modules/letterSlice";
import member from "redux/modules/member";
import { configureStore } from "@reduxjs/toolkit";
import openLoginToggle from "../modules/login";
import auth from "redux/modules/authSlice";
//툴킷으로 스토어 구성
const store = configureStore({
  reducer: {
    letters,
    member,
    openLoginToggle,
    auth,
  },
});
export default store;
