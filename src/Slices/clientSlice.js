import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { encryptPhpCompatible } from "../cryptoHelper";
import axios from "axios";

export const fetchClientSiteData = createAsyncThunk("tsc/fetchClientSiteData",
  async (userData) => {
    const edit = encryptPhpCompatible("edit");
    const first = encryptPhpCompatible(userData.userId.toString() + "first");
    const second = encryptPhpCompatible(userData.userId.toString() + "second");
    const user_id = encryptPhpCompatible(userData.userId.toString());
    const result = await axios.get(
      "https://tsc.sterlinginfotech.com/users/clientSitesReact/" +
        edit + "/" + user_id + "/" + second + "/" + first
    );
    
    return result.data;
  }
)
export const fetchClientViewSiteData = createAsyncThunk(
  "tec/fetchClientViewSiteData",
  async (userData) => {
    const edit = encryptPhpCompatible("edit");
    const first = encryptPhpCompatible(userData.id.toString() + "first");
    const user_id = encryptPhpCompatible(userData.userId.toString());
    const id_encrypted = userData.id.toString();
    const result = await axios.get(
      "https://tsc.sterlinginfotech.com/users/clientViewSiteReact/" +
        edit + "/" + user_id + "/" + id_encrypted + "/" + first
    );
    return result.data;
  }
);
export const fetchClientSiteAssetsData = createAsyncThunk(
  "tec/fetchClientSiteAssetsData",
  async (userData) => {
    const edit = encryptPhpCompatible("edit");
    const first = encryptPhpCompatible(userData.id.toString() + "first");
    const user_id = encryptPhpCompatible(userData.userId.toString());
    const id_encrypted = userData.id.toString();
    const result = await axios.get(
      "https://tsc.sterlinginfotech.com/users/clientSiteAssetsReact/" +
        edit + "/" + user_id + "/" + id_encrypted + "/" + first
    );
    return result.data;
  }
);
export const fetchClientSiteContactsData = createAsyncThunk(
  "tec/fetchClientSiteContactsData",
  async (userData) => {
    const edit = encryptPhpCompatible("edit");
    const first = encryptPhpCompatible(userData.id.toString() + "first");
    const user_id = encryptPhpCompatible(userData.userId.toString());
    const id_encrypted = userData.id.toString();
    const result = await axios.get(
      "https://tsc.sterlinginfotech.com/users/clientSiteContactsReact/" +
        edit + "/" + user_id + "/" + id_encrypted + "/" + first
    );
    return result.data;
  }
);

export const fetchClientAssetsData = createAsyncThunk(
  "tec/fetchClientAssetData",
  async (userData) => {
    const edit = encryptPhpCompatible("edit");
    const first = encryptPhpCompatible(userData.userId.toString() + "first");
    const user_id = encryptPhpCompatible(userData.userId.toString());
    const second = encryptPhpCompatible(userData.userId.toString() + "second");
    console.log( "https://tsc.sterlinginfotech.com/users/clientAssetListingReact/" +
        edit + "/" + user_id + "/" + second + "/" + first)
    const result = await axios.get(
      "https://tsc.sterlinginfotech.com/users/clientAssetListingReact/" +
        edit + "/" + user_id + "/" + second + "/" + first
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

      
      .addCase(fetchClientViewSiteData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClientViewSiteData.fulfilled, (state, action) => {
        state.clientSiteData = action.payload;
        state.loading = false;
      })
      .addCase(fetchClientViewSiteData.rejected, (state) => {
        state.loading = false;
        state.error = "There was an error";
      })
      
      .addCase(fetchClientSiteAssetsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClientSiteAssetsData.fulfilled, (state, action) => {
        state.siteAssetsData = action.payload;
        state.loading = false;
      })
      .addCase(fetchClientSiteAssetsData.rejected, (state) => {
        state.loading = false;
        state.error = "There was an error";
      })
      
      .addCase(fetchClientSiteContactsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClientSiteContactsData.fulfilled, (state, action) => {
        state.siteContactsData = action.payload;
        state.loading = false;
      })
      .addCase(fetchClientSiteContactsData.rejected, (state) => {
        state.loading = false;
        state.error = "There was an error";
      })
      
      .addCase(fetchClientAssetsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClientAssetsData.fulfilled, (state, action) => {
        state.AssetsData = action.payload;
        state.loading = false;
      })
      .addCase(fetchClientAssetsData.rejected, (state) => {
        state.loading = false;
        state.error = "There was an error";
      })
      ;
  },
});

export const { clientData,clientSiteData,siteAssetsData,siteContactsData } =clientSl.actions; //exported to UI
export const tscClientReducer = clientSl.reducer; //exported to store
