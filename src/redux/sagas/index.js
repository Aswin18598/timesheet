import { all } from "redux-saga/effects"
import authWatcher from "./auth/authSaga"
import EmployeeSaga from "./employee/employeeSaga"
import TimeTrackerSaga from "./time-tracker/timeTrackerSaga"
import CalenderSaga from "./calender/calenderSaga"

export function* WatchSagas() {
  yield all([authWatcher(), EmployeeSaga(), TimeTrackerSaga(), CalenderSaga()])
}
