import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Movie = {
  id: number;
  original_title?: string;
  name?: string;
  release_date: string;
  poster_path: string;
};

export interface MoviesState {
  currentPageData: Movie[];
  currentPage: number;
  total: number;
  selectedItems: Movie[];
}

export const initialState: MoviesState = {
  currentPageData: [],
  currentPage: 1,
  total: 0,
  selectedItems: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setCurrentPageData(state, action: PayloadAction<Movie[]>) {
      state.currentPageData = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      console.log(action.payload);
      state.currentPage = action.payload;
    },
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
    setSelectedItems(state, action: PayloadAction<Movie[]>) {
      state.selectedItems = action.payload;
    },
    toggleItem: (state, action: PayloadAction<Movie>) => {
      const index = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        state.selectedItems.splice(index, 1);
      } else {
        state.selectedItems.push(action.payload);
      }
    },
    unselectAll: (state) => {
      state.selectedItems = [];
    },
  },
});

export const {
  setCurrentPageData,
  setCurrentPage,
  setTotal,
  setSelectedItems,
  toggleItem,
  unselectAll,
} = moviesSlice.actions;
export default moviesSlice.reducer;
