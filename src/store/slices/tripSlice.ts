import { createSlice } from "@reduxjs/toolkit";
import tripAPI from "../scripts/tripAPI";

const tripSlice = createSlice({
  name: "trip",
  initialState: {
    tripsByUser: [],
    tripsByTrip: [],
  },
  reducers: {
    setTripsByUser(state, action) {
      state.tripsByUser = action.payload;
    },
  },
});

export const tripsByUser = (user_id: number) => async (dispatch: any) => {
  const responseData = await tripAPI.getTripsByUser(user_id);
  const modifiedData = responseData.map((trip) => {
    if (trip.user_id !== user_id) {
      trip.attending = "";
    }
    return trip;
  });
  dispatch(tripSlice.actions.setTripsByUser(modifiedData));
};

export default tripSlice.reducer;
export const { setTripsByUser } = tripSlice.actions;
