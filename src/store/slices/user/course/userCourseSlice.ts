import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { IUserCourse, IUserCourseRequest } from "../../../../interfaces";

export interface IUserCourseState {
  course: IUserCourse | undefined;
  courseError: string | null;
  courseLoading: boolean;
}

export const fetchUserCourse = createAsyncThunk<
  IUserCourse,
  IUserCourseRequest,
  { rejectValue: string }
>("FETCH_COURSE", ({ token, id }, { rejectWithValue }) => {
  const API_URL_USER_COURSE =
    process.env.REACT_APP_API_URl_AUTH_USER + "/course";

  const idString = id?.toString();

  return fetch(API_URL_USER_COURSE + "/" + idString, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("failed to fetch user course");
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return rejectWithValue(error.message);
    });
});

const initialState: IUserCourseState = {
  courseError: null,
  courseLoading: false,
  course: undefined,
};

export const userCourseSlice = createSlice({
  name: "user course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserCourse.fulfilled, (state, { payload }) => {
      return { ...state, course: payload, courseLoading: false };
    });
    builder.addCase(fetchUserCourse.pending, (state) => {
      return { ...state, courseError: null, courseLoading: true };
    });
    builder.addCase(fetchUserCourse.rejected, (state, { payload }) => {
      return payload
        ? { ...state, courseError: payload, courseLoading: false }
        : {
            ...state,
            courseError: "unknown error",
            courseLoading: false,
          };
    });
  },
});

export default userCourseSlice.reducer;
export type UserCourseDispatch = ThunkDispatch<IUserCourse, any, AnyAction>;
