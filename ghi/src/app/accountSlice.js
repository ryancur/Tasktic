import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: null,
  email: "",
  username: "",
  password: "",
  first_name: "",
  last_name: "",
  picture_url: "",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    updateField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    showModal: (state, action) => {
      state.show = action.payload;
    },
    clearForm: () => {
      return initialState;
    },
  },
});

export const { clearForm, updateField, showModal } = accountSlice.actions;

export const LOG_IN_MODAL = "LOG_IN_MODAL";
export const SIGN_UP_MODAL = "SIGN_UP_MODAL";
