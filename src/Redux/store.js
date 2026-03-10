import { configureStore } from "@reduxjs/toolkit";
import applicationsReducer from "./applicationSlice";
import cvReducer from "./cvSlice";
import jobsReducer from "./jobSlice";

export const store = configureStore({
  reducer: {
    applications: applicationsReducer,
    cv: cvReducer,
    jobs: jobsReducer,
  },
});

export default store;
