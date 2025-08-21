import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { encryptPhpCompatible } from "../cryptoHelper";
import axios from "axios";

export const fetchserviceData = createAsyncThunk("tec/fetchserviceData",
  async (userData) => {
    const result = await axios.get("https://tsc.sterlinginfotech.com/users/serviceReact/" + userData.userId+'/'+userData.completed);
    return result.data;
  }
)
export const fetchSingleServiceData = createAsyncThunk(
  "tec/fetchSingleServiceData",
  async (userData) => {
    console.log("User ID lastest",userData.id.toString())
    const edit = encryptPhpCompatible("edit");
    const first = encryptPhpCompatible(userData.id.toString() + "first");
    const user_id = encryptPhpCompatible(userData.userId.toString());
    const id_encrypted = userData.id.toString();
    const result = await axios.get(
      "https://tsc.sterlinginfotech.com/users/serviceClientViewReact/" +
        edit + "/" + user_id + "/" + id_encrypted + "/" + first
    );
    return result.data;
  }
);

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
      .addCase(fetchSingleServiceData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleServiceData.fulfilled, (state, action) => {
        state.serviceClientViewData = action.payload;
        state.loading = false;
      })
      .addCase(fetchSingleServiceData.rejected, (state) => {
        state.loading = false;
        state.error = "There was an error";
      })
      ;
  },
});

export const { serviceData } =serviceSl.actions; //exported to UI
export const tscServiceReducer = serviceSl.reducer; //exported to store
