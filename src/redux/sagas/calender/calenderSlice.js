import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  calenderTasks: [],
}

const calenderSlice = createSlice({
  name: "calenderSlice",
  initialState,
  reducers: {
    setCalenderTasks: (state, action) => {
      return { ...state, calenderTasks: action.payload }
    },
  },
})

export const { setCalenderTasks } = calenderSlice.actions
export default calenderSlice.reducer
