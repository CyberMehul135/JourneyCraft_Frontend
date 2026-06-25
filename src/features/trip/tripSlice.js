import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    destination: "",
    destinationPlaceId: "",
    travellers: "",
    startDate: "",
    endDate: "",
    budget: "",

    interests: [],
    accomodation: "",
    transportation: "",
    specialRequirements: "",
  },
  tripData: {},
  tripDeleteDialog: {
    isOpen: false,
    data: {},
  },
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    updateFields(state, action) {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    resetFields(state, action) {
      state.formData = initialState.formData;
    },
    toggleInterests(state, action) {
      const value = action.payload;

      if (state.formData.interests.includes(value)) {
        state.formData.interests = state.formData.interests.filter(
          (i) => i !== value,
        );
      } else {
        state.formData.interests.push(value);
      }
    },
    updateTripData(state, action) {
      state.tripData = action.payload;
    },
    toggleDeleteDialog(state, action) {
      state.tripDeleteDialog.isOpen = action.payload.isOpen;
      if (action.payload.data) {
        state.tripDeleteDialog.data = action.payload.data;
      }
    },
  },
});

export const {
  updateFields,
  resetFields,
  toggleInterests,
  updateTripData,
  toggleDeleteDialog,
} = tripSlice.actions;
export default tripSlice.reducer;
