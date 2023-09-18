import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { activitiesApi } from "./api";
import { authApiSlice } from "./authApi";
import { accountSlice } from "./accountSlice";

export const store = configureStore({
  reducer: {
    [activitiesApi.reducerPath]: activitiesApi.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [accountSlice.name]: accountSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(activitiesApi.middleware)
      .concat(authApiSlice.middleware);
  },
});

setupListeners(store.dispatch);
