import { call, put, takeLatest } from "redux-saga/effects"
import axios from "axios"
import {
  AUTH_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST,
} from "../types"
import {
  AUTH_REQUEST_API,
  FORGOT_PASSWORD_API,
  RESET_PASSWORD_API,
} from "../../../network/apis/apiPath"
import { setLoader } from "../loader/loaderSlice"
import { CustomMessage } from "../../../utils"
import {
  LOGIN_PAGE_PATH,
  RESET_PASSWORD_PAGE_PATH,
  TIME_TRACKER_PAGE_PATH,
} from "../../../routes/routePath"
import { setAuthProfile, setAuthToken } from "./authSlice"

function* authWorker({ payload }) {
  const { data, enqueueSnackbar, reset, navigate } = payload
  try {
    yield put(setLoader(true))
    const response = yield call(axios.post, AUTH_REQUEST_API, data)
    if (response) {
      reset()
      const { message, token, ...others } = response.data
      CustomMessage(message, "success", enqueueSnackbar)
      yield put(setAuthToken(response.data?.token))
      yield put(setAuthProfile({ ...others }))
      navigate(TIME_TRACKER_PAGE_PATH)
    }
  } catch (error) {
    const { message } = error.response.data
    CustomMessage(message, "error", enqueueSnackbar)
  } finally {
    yield put(setLoader(false))
  }
}

function* resetPasswordWorker({ payload }) {
  const { data, enqueueSnackbar, reset, navigate } = payload
  try {
    yield put(setLoader(true))
    const response = yield call(axios.post, RESET_PASSWORD_API, {
      email: data?.email,
      password: data?.password,
    })
    if (response) {
      reset()
      const { message } = response.data
      CustomMessage(message, "success", enqueueSnackbar)
      navigate(LOGIN_PAGE_PATH)
    }
  } catch (error) {
    const { message } = error.response.data
    CustomMessage(message, "error", enqueueSnackbar)
  } finally {
    yield put(setLoader(false))
  }
}
function* forgotPasswordWorker({ payload }) {
  const { email, reset, navigate, enqueueSnackbar } = payload
  try {
    yield put(setLoader(true))
    const response = yield call(axios.post, FORGOT_PASSWORD_API, { email })
    if (response) {
      reset()
      navigate(RESET_PASSWORD_PAGE_PATH, { state: response?.data })
    }
  } catch (error) {
    const { message } = error.response.data
    CustomMessage(message, "error", enqueueSnackbar)
  } finally {
    yield put(setLoader(false))
  }
}

export default function* authWatcher() {
  yield takeLatest(AUTH_REQUEST, authWorker)
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPasswordWorker)
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordWorker)
}
