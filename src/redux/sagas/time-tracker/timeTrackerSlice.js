import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  taskLists: {},
  approvedTasksList: [],
}

const TimeTrackerSlice = createSlice({
  name: "TaskSlice",
  initialState,
  reducers: {
    setTaskLists: (state, action) => ({ ...state, taskLists: action.payload }),
    setApprovedTasksList: (state, action) => ({
      ...state,
      approvedTasksList: action.payload,
    }),
  },
})
export const { setTaskLists, setApprovedTasksList } = TimeTrackerSlice.actions
export default TimeTrackerSlice.reducer
