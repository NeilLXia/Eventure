import { createSlice } from "@reduxjs/toolkit";

const appStateSlice = createSlice({
  name: "appState",
  initialState: {
    userID: 1,
    currentTrip: null,
    currentEvent: null,
    currentTab: 1,
    priorTab: 1,
  },
  reducers: {
    setCurrentTab(state, action) {
      state.currentTab = action.payload;
    },
    setPriorTab(state, action) {
      state.priorTab = action.payload;
    },
    setCurrentTrip(state, action) {
      state.currentTrip = action.payload;
    },
    setCurrentEvent(state, action) {
      state.currentEvent = action.payload;
    },
  },
});

export const setCurrentEventData =
  (eventData: any) => async (dispatch: any) => {
    await dispatch(appStateSlice.actions.setCurrentEvent(eventData));
  };

export default appStateSlice.reducer;
export const { setCurrentTab, setPriorTab, setCurrentEvent, setCurrentTrip } =
  appStateSlice.actions;
