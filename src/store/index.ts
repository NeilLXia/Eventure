import { configureStore } from "@reduxjs/toolkit";
import theme from "./slices/themeSlice";
import example from "./slices/exampleSlice";
import appState from "./slices/appStateSlice";
import event from "./slices/eventSlice";
import trip from "./slices/tripSlice";

export default configureStore({
  reducer: {
    example: example,
    theme: theme,
    appState: appState,
    event: event,
    trip: trip,
  },
});
