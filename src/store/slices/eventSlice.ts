import { createSlice } from "@reduxjs/toolkit";
import eventAPI from "../scripts/eventAPI";
import appStateSlice, { setCurrentEventData } from "./appStateSlice";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    eventsByUser: [],
    eventsByTrip: [],
  },
  reducers: {
    setEventsByUser(state, action) {
      state.eventsByUser = action.payload;
    },
    setEventsByTrip(state, action) {
      state.eventsByTrip = action.payload;
    },
  },
});

export const getOneEvent = (event_id: number) => async (dispatch: any) => {
  const responseData = await eventAPI.getEvent(event_id);
  return responseData;
};

export const eventsByUser = (user_id: number) => async (dispatch: any) => {
  const responseData = await eventAPI.getEventsByUser(user_id);
  const modifiedData = responseData.map((event) => {
    return event;
  });
  dispatch(eventSlice.actions.setEventsByUser(modifiedData));
};

export const eventsByTrip = (trip_id: number) => async (dispatch: any) => {
  const responseData = await eventAPI.getEventsByTrip(trip_id);
  dispatch(eventSlice.actions.setEventsByTrip(responseData));
};

export default eventSlice.reducer;
export const { setEventsByUser, setEventsByTrip } = eventSlice.actions;
