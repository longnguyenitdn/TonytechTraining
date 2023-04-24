import { createSlice } from "@reduxjs/toolkit";
export const settingSlice = createSlice({
  name: "setting",
  initialState: { loadingStatus: false },
  reducers: {
    setLoading: (state, action) => {
      state.loadingStatus = action.payload;
    },
  },
});
export const { setLoading } = settingSlice.actions;
export default settingSlice.reducer;