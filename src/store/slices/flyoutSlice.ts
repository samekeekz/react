import { createSlice } from "@reduxjs/toolkit";

export interface FlyoutState {
  visible: boolean;
}

export const initialState: FlyoutState = {
  visible: false,
};

const flyoutSlice = createSlice({
  name: "flyout",
  initialState,
  reducers: {
    showFlyout: (state) => {
      state.visible = true;
    },
    hideFlyout: (state) => {
      state.visible = false;
    },
  },
});

export const { showFlyout, hideFlyout } = flyoutSlice.actions;
export default flyoutSlice.reducer;
