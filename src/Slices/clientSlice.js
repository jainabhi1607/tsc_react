import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { encryptPhpCompatible } from "../cryptoHelper";
import axios from "axios";

export const fetchClientSiteData = createAsyncThunk("tec/fetchclientData",
  async (userData) => {

    const edit = encryptPhpCompatible("edit");
    const first = encryptPhpCompatible(userData.id.toString() + "first");
    const user_id = encryptPhpCompatible(userData.userId.toString());
    const id_encrypted = userData.id.toString();
    const result = await axios.get(
      "https://tsc.sterlinginfotech.com/users/clientSitesReact/" +
        edit + "/" + user_id + "/" + id_encrypted + "/" + first
    );
    
    return result.data;
  }
)
export const fetchSingleClientData = createAsyncThunk(
  "tec/fetchClientData",
  async (userData) => {
    console.log("User ID lastest",userData.id.toString())
    const edit = encryptPhpCompatible("edit");
    const first = encryptPhpCompatible(userData.id.toString() + "first");
    const user_id = encryptPhpCompatible(userData.userId.toString());
    const id_encrypted = userData.id.toString();
    const result = await axios.get(
      "https://tsc.sterlinginfotech.com/users/clientSitesReact/" +
        edit + "/" + user_id + "/" + id_encrypted + "/" + first
    );
    return result.data;
  }
);

export const clientSl = createSlice({
  name: "clientSlice",
  initialState: {
    clientData : [],
  },
  reducers: {

  },
   extraReducers: (builder) => {
    builder
      .addCase(fetchClientSiteData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClientSiteData.fulfilled, (state, action) => {
        state.clientData = action.payload;
        state.loading = false;
      })
      .addCase(fetchClientSiteData.rejected, (state) => {
        state.loading = false;
        state.error = "There was an error";
      })
      ;
  },
});

export const { clientData } =clientSl.actions; //exported to UI
export const tscClientReducer = clientSl.reducer; //exported to store
