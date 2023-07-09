import { combineReducers } from "@reduxjs/toolkit"
import authSlice from "../sagas/auth/authSlice"
import employeeSlice from "../sagas/employee/employeeSlice"
import loaderSlice from "../sagas/loader/loaderSlice"
import timeTrackerSlice from "../sagas/time-tracker/timeTrackerSlice"
import calenderSlice from "../sagas/calender/calenderSlice"

export const rootReducer = combineReducers({
  auth: authSlice,
  employee: employeeSlice,
  loader: loaderSlice,
  Tasks: timeTrackerSlice,
  calender: calenderSlice,
})
