import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHomeData = createAsyncThunk("tec/fetchHomeData",
  async (userId) => {
    const result = await axios.get("https://tsc.sterlinginfotech.com/users/dashboardReact/" + userId);
    //console.log("Result data",result.data)
    return result.data;
  }
)

export const userSl = createSlice({
  name: "userSlice",
  initialState: {
    userId: 0,
    isLogin: false,
    homeData : [],
  },
  reducers: {

  },
   extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.homeData = action.payload;
        state.loading = false;
      })
      .addCase(fetchHomeData.rejected, (state) => {
        state.loading = false;
        state.error = "There was an error";
      })
  },
});

export const { userId, isLogin,homeData, } =userSl.actions; //exported to UI
export const tscReducer = userSl.reducer; //exported to store
