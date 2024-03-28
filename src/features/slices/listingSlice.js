import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const BASE_URL = "https://d035733c-64bf-4096-9586-89a1c9c838f3-00-3ch5klv342331.kirk.replit.dev";

//async thunk to fetch listing data from db
export const fetchListings = createAsyncThunk(
  "listing/fetchListings",
  async () => {
    const response = await fetch(`${BASE_URL}/`);
    return await response.json();
  }
)

//async thunk to fetch individual listing data from db
export const fetchListing = createAsyncThunk(
  "listing/fetchListing",
  async (id) => {
    const response = await fetch(`${BASE_URL}/bookings/${id}`);
    return await response.json();
  }
)

//async thunk to book listing data to db
export const bookListing = createAsyncThunk(
  "listing/bookListing",
  //data is the booking data that has  uid, booking_start, booking_end 

  async ({ data, id }) => {
    const res = await axios.post(`${BASE_URL}/bookings/${id}`, data);
    return res;
  }
)

//async thunk to delete a booking from db.

export const deleteBooking = createAsyncThunk(
  "listing/deleteBooking",
  async (id) => {
    await axios.put(`${BASE_URL}/bookings/user`, { bookingId: id });
  }
)


const listingSlice = createSlice({
  name: "listing",
  initialState: {
    listings: [],
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListings.fulfilled, (state, action) => {
      state.listings = action.payload;
      state.loading = false;
    })
      .addCase(fetchListing.fulfilled, (state, action) => {
        state.listings = action.payload;
        state.loading = false;
      })
      .addCase(bookListing.fulfilled, (state) => {
        //this doesn't do anything (filler line)
        state.loading = false;
      })
      .addCase(deleteBooking.fulfilled, (state) => {
        //this doesn't do anything (filler line)
        state.loading = false;
      })
  }
});


export default listingSlice.reducer;
