import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { IUserBookmark, IUserCourseRequest } from "../../../../interfaces";

export interface IUserBookmarkState {
  course: IUserBookmark | undefined;
  courseError: string | null;
  courseLoading: boolean;
}

export const fetchUserBookmark = createAsyncThunk<
  IUserBookmark,
  IUserCourseRequest,
  { rejectValue: string }
>("FETCH_USER_BOOKMARK", ({ token, id }, { rejectWithValue }) => {
  const API_URL_USER_BOOKMARK =
    process.env.REACT_APP_API_URL_AUTH_USER + "/bookmark";

  const idString = id?.toString();

  return fetch(API_URL_USER_BOOKMARK + "/" + idString, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("failed to fetch user bookmark");
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return rejectWithValue(error.message);
    });
});

const initialState: IUserBookmarkState = {
  courseError: null,
  courseLoading: false,
  course: undefined,
};

export const userBookmarkSlice = createSlice({
  name: "user bookmark",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserBookmark.fulfilled, (state, { payload }) => {
      return { ...state, course: payload, courseLoading: false };
    });
    builder.addCase(fetchUserBookmark.pending, (state) => {
      return { ...state, courseError: null, courseLoading: true };
    });
    builder.addCase(fetchUserBookmark.rejected, (state, { payload }) => {
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

export default userBookmarkSlice.reducer;
export type UserBookmarkDispatch = ThunkDispatch<IUserBookmark, any, AnyAction>;
