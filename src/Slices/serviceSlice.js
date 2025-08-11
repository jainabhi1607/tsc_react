import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchserviceData = createAsyncThunk("tec/fetchserviceData",
  async (userData) => {
    console.log("status","https://tsc.sterlinginfotech.com/users/serviceReact/" + userData.userId+'/'+userData.completed)
    const result = await axios.get("https://tsc.sterlinginfotech.com/users/serviceReact/" + userData.userId+'/'+userData.completed);
    console.log("Result data",result.data)
    return result.data;
  }
)

export const serviceSl = createSlice({
  name: "serviceSlice",
  initialState: {
    serviceData : [],
  },
  reducers: {

  },
   extraReducers: (builder) => {
    builder
      .addCase(fetchserviceData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchserviceData.fulfilled, (state, action) => {
        state.serviceData = action.payload;
        state.loading = false;
      })
      .addCase(fetchserviceData.rejected, (state) => {
        state.loading = false;
        state.error = "There was an error";
      })
  },
});

export const { userId, isLogin,serviceData, } =serviceSl.actions; //exported to UI
export const tscServiceReducer = serviceSl.reducer; //exported to store
