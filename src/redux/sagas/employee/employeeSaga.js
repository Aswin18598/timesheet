import { call, put, takeLatest } from "redux-saga/effects"
import { axiosInstance } from "../../../network/apis"
import {
  ADD_TASK_DETAILS_API,
  GET_EMPLOYEE_DETAILS_API,
  UPDATE_ALL_TASK_API,
  UPDATE_TASK_DETAILS_API,
} from "../../../network/apis/apiPath"
import { CustomMessage, groupTasksAsPerDate } from "../../../utils"
import { setLoader } from "../loader/loaderSlice"
import {
  APPROVE_REJECT_ALL_TASK_REQUEST,
  EMPLOYEE_REQUEST,
  EMPLOYEE_TASK_HISTORY_REQUEST,
  TASK_APPROVE_REJECT_REQUEST,
} from "../types"
import { setEmployeeDetails, setEmployeeTaskHistory } from "./employeeSlice"

function* getEmployeeDetails(action) {
  try {
    yield put(setLoader(true))
    const response = yield call(axiosInstance.get, GET_EMPLOYEE_DETAILS_API)
    if (response) {
      const responseData = response.data
      yield put(setEmployeeDetails(responseData))
    }
  } catch (error) {
    console.error("error", error)
  } finally {
    yield put(setLoader(false))
  }
}
function* getEmployeeTaskHistoryDetails(action) {
  const { empID, date } = action.payload
  try {
    yield put(setLoader(true))
    const response = yield call(
      axiosInstance.get,
      `${ADD_TASK_DETAILS_API}?empID=${empID}${date ? `&date=${date}` : ""}`
    )
    if (response) {
      const taskListsOfEmployee = groupTasksAsPerDate(response.data)
      yield put(setEmployeeTaskHistory(taskListsOfEmployee))
    }
  } catch (error) {
    console.error("taskHistoryError", error)
  } finally {
    yield put(setLoader(false))
  }
}
function* approveRejectTaskDetails(action) {
  const { selectedTask, isApproved } = action.payload
  const { enqueueSnackbar } = selectedTask
  try {
    yield put(setLoader(true))
    const response = yield call(
      axiosInstance.put,
      `${UPDATE_TASK_DETAILS_API}/${selectedTask?._id}`,
      { isApproved }
    )
    if (response) {
      CustomMessage(response?.data?.message, "success", enqueueSnackbar)
      yield put({
        type: EMPLOYEE_TASK_HISTORY_REQUEST,
        payload: { empID: selectedTask?.empID },
      })
    }
  } catch (error) {
    console.error("taskStatusUpdationError", error)
  } finally {
    yield put(setLoader(false))
  }
}
function* approveRejectAllTaskDetails(action) {
  const { empID, date, enqueueSnackbar, isApproved } = action.payload
  try {
    yield put(setLoader(true))
    const response = yield call(
      axiosInstance.put,
      `${UPDATE_ALL_TASK_API}/${date}/${empID}`,
      { isApproved }
    )
    if (response) {
      yield put({
        type: EMPLOYEE_TASK_HISTORY_REQUEST,
        payload: { empID },
      })
      CustomMessage(response?.data?.message, "success", enqueueSnackbar)
    }
  } catch (error) {
    console.error("taskStatusUpdationError", error)
  } finally {
    yield put(setLoader(false))
  }
}

function* EmployeeSaga() {
  yield takeLatest(EMPLOYEE_REQUEST, getEmployeeDetails)
  yield takeLatest(EMPLOYEE_TASK_HISTORY_REQUEST, getEmployeeTaskHistoryDetails)
  yield takeLatest(TASK_APPROVE_REJECT_REQUEST, approveRejectTaskDetails)
  yield takeLatest(APPROVE_REJECT_ALL_TASK_REQUEST, approveRejectAllTaskDetails)
}

export default EmployeeSaga
