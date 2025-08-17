import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchsupportData = createAsyncThunk(
  "tec/fetchsupportData",
  async (userData) => {
    const result = await axios.get(
      "http://localhost/coxy/totalspray/users/supportTicketReact/" + userData.userId
    );
    //console.log("Result data",result.data.data)
    return result.data;
  }
);

export const fetchSingleSupportData = createAsyncThunk(
  "tec/fetchSingleSupportData",
  async (userData) => {
    console.log("https://tsc.sterlinginfotech.com/users/supportTicketClientViewReact/" +
        userData.userId + "/" + userData.id);
    const result = await axios.get(
      "https://tsc.sterlinginfotech.com/users/supportTicketClientViewReact/" +
        userData.userId + "/" + userData.id
    );
    return result.data;
  }
);

export const supportSl = createSlice({
  name: "supportSlice",
  initialState: {
    supportData: [],
    supportClientViewData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchsupportData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchsupportData.fulfilled, (state, action) => {
        state.supportData = action.payload;
        state.loading = false;
      })
      .addCase(fetchsupportData.rejected, (state) => {
        state.loading = false;
        state.error = "There was an error";
      })
      .addCase(fetchSingleSupportData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleSupportData.fulfilled, (state, action) => {
        state.supportClientViewData = action.payload;
        state.loading = false;
      })
      .addCase(fetchSingleSupportData.rejected, (state) => {
        state.loading = false;
        state.error = "There was an error";
      })
      ;
  },
});

export const { userId, isLogin, supportData, supportClientViewData } = supportSl.actions; //exported to UI
export const tscSupportReducer = supportSl.reducer; //exported to store
