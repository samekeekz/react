import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice.ts";
import moviesReducer from "./slices/movieSlice.ts";
import flyoutReducer from "./slices/flyoutSlice.ts";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    movies: moviesReducer,
    flyout: flyoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
