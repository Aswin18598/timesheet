import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  employeeDetails: [],
  employeeTaskHistory: {},
}

const EmployeeDetailsSlice = createSlice({
  name: "EmployeeDetailsSlice",
  initialState,
  reducers: {
    setEmployeeDetails: (state, action) => {
      return { ...state, employeeDetails: action.payload }
    },
    setEmployeeTaskHistory: (state, action) => {
      return { ...state, employeeTaskHistory: action.payload }
    },
  },
})

export const { setEmployeeDetails, setEmployeeTaskHistory } =
  EmployeeDetailsSlice.actions
export default EmployeeDetailsSlice.reducer
