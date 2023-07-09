import { call, put, takeLatest } from "redux-saga/effects"
import { axiosInstance } from "../../../network/apis"
import { CALENDER_TASK_REQUEST } from "../types"
import { ADD_TASK_DETAILS_API } from "../../../network/apis/apiPath"
import { setCalenderTasks } from "./calenderSlice"
import { setLoader } from "../loader/loaderSlice"

function* getCalenderDetails(action) {
  const { date, empID } = action.payload
  try {
    yield put(setLoader(true))
    const response = yield call(
      axiosInstance.get,
      `${ADD_TASK_DETAILS_API}?empID=${empID}${date ? `&date=${date}` : ""}`
    )
    if (response) {
      yield put(setCalenderTasks(response.data))
    }
  } catch (error) {
    console.error("calenderTaskListsError", error)
  } finally {
    yield put(setLoader(false))
  }
}

function* CalenderSaga() {
  yield takeLatest(CALENDER_TASK_REQUEST, getCalenderDetails)
}

export default CalenderSaga
