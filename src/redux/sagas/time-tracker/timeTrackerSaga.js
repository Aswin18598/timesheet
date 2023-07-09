import { call, put, takeLatest } from "redux-saga/effects"
import { axiosInstance } from "../../../network/apis"
import {
  ADD_TASK_DETAILS_API,
  APPROVED_TASK_DETAILS_API,
} from "../../../network/apis/apiPath"
import { CustomMessage, groupTasksAsPerDate } from "../../../utils"
import { setLoader } from "../loader/loaderSlice"
import {
  ADD_TASK_REQUEST,
  APPROVED_TASK_REQUEST,
  DELETE_TASK_REQUEST,
  TIME_TRACKER_REQUEST,
  UPDATE_TASK_REQUEST,
} from "../types"
import { setApprovedTasksList, setTaskLists } from "./timeTrackerSlice"

function* timeTrakerDetails(action) {
  const { date, empID } = action.payload
  try {
    yield put(setLoader(true))
    const response = yield call(
      axiosInstance.get,
      `${ADD_TASK_DETAILS_API}?empID=${empID}${date ? `&date=${date}` : ""}`
    )
    if (response) {
      const taskLists = groupTasksAsPerDate(response.data)
      yield put(setTaskLists(taskLists))
    }
  } catch (error) {
    console.error("taskListsError", error)
  } finally {
    yield put(setLoader(false))
  }
}
function* addTaskDetails({ payload }) {
  const { setIsOpen, requestData, enqueueSnackbar, empID } = payload
  try {
    yield put(setLoader(true))
    const response = yield call(
      axiosInstance.post,
      ADD_TASK_DETAILS_API,
      JSON.parse(JSON.stringify(requestData))
    )
    if (response) {
      setIsOpen(false)
      const { message } = response.data
      CustomMessage(message, "success", enqueueSnackbar)
      yield put({
        type: TIME_TRACKER_REQUEST,
        payload: { empID },
      })
    }
  } catch (error) {
    const { message } = error.response.data
    CustomMessage(message, "error", enqueueSnackbar)
  } finally {
    yield put(setLoader(false))
  }
}
function* deleteTaskWorker(action) {
  const { _id, empID, enqueueSnackbar } = action.payload
  try {
    yield put(setLoader(true))
    const response = yield call(
      axiosInstance.delete,
      `${ADD_TASK_DETAILS_API}/${_id}`
    )
    if (response) {
      CustomMessage(response?.data?.message, "success", enqueueSnackbar)
      yield put({ type: TIME_TRACKER_REQUEST, payload: { empID } })
    }
  } catch (error) {
    CustomMessage(error?.response?.data?.message, "error", enqueueSnackbar)
    console.error("deleteTaskError", error)
  } finally {
    yield put(setLoader(false))
  }
}
function* updateTaskWorker(action) {
  const { setIsOpen, requestData, enqueueSnackbar, id, empID } = action.payload
  try {
    yield put(setLoader(true))
    const response = yield call(
      axiosInstance.put,
      `${ADD_TASK_DETAILS_API}/${id}`,
      { ...requestData }
    )
    CustomMessage(response?.data?.message, "success", enqueueSnackbar)
    setIsOpen(false)
    yield put({
      type: TIME_TRACKER_REQUEST,
      payload: { empID },
    })
  } catch (error) {
    CustomMessage(error?.response?.data?.message, "error", enqueueSnackbar)
  } finally {
    yield put(setLoader(false))
  }
}
function* getApprovedTasksDetails(action) {
  const { startingDate, endingDate } = action.payload
  try {
    yield put(setLoader(true))
    const response = yield call(
      axiosInstance.get,
      `${APPROVED_TASK_DETAILS_API}?startingDate=${startingDate}&endingDate=${endingDate}`
    )
    if (response) {
      yield put(setApprovedTasksList(response.data))
    }
  } catch (error) {
    console.error("approvedTasksListsError", error)
  } finally {
    yield put(setLoader(false))
  }
}

function* TimeTrackerSaga() {
  yield takeLatest(TIME_TRACKER_REQUEST, timeTrakerDetails)
  yield takeLatest(ADD_TASK_REQUEST, addTaskDetails)
  yield takeLatest(DELETE_TASK_REQUEST, deleteTaskWorker)
  yield takeLatest(UPDATE_TASK_REQUEST, updateTaskWorker)
  yield takeLatest(APPROVED_TASK_REQUEST, getApprovedTasksDetails)
}

export default TimeTrackerSaga
