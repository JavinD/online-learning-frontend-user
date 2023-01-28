import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/userSlice";
import courseReducer from "./slices/course/courseSlice";
import categoryReducer from "./slices/course/category/categorySlice";
import courseDetailReducer from "./slices/course/courseDetailSlice";
import trendingCourseReducer from "./slices/course/trendingCourseSlice";
import cartReducer from "./slices/cart/cartSlice";
import tagReducer from "./slices/course/tag/tagSlice";
import userCourseReducer from "./slices/user/course/userCourseSlice";
import logger from "redux-logger";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    course: courseReducer,
    courseDetail: courseDetailReducer,
    userCourse: userCourseReducer,
    trendingCourse: trendingCourseReducer,
    user: userReducer,
    tag: tagReducer,
    category: categoryReducer,
    cart: cartReducer,
  },
  middleware: [logger, thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
