const BASE_URL = process.env.REACT_APP_API_BASE_URL

//Auth
const AUTH_REQUEST_API = BASE_URL + "auth/signin"
const RESET_PASSWORD_API = BASE_URL + "auth/resetpassword"
const FORGOT_PASSWORD_API = BASE_URL + "auth/forgotpassword"

//Employee
const GET_EMPLOYEE_DETAILS_API = BASE_URL + "users"
// tasks
const ADD_TASK_DETAILS_API = BASE_URL + "task"
const UPDATE_TASK_DETAILS_API = BASE_URL + "task/update"
const APPROVED_TASK_DETAILS_API = BASE_URL + "task/approved"
const UPDATE_ALL_TASK_API = BASE_URL + "task/updateall" //send date/empID in params
//TimeTrackers

export {
  BASE_URL,
  AUTH_REQUEST_API,
  RESET_PASSWORD_API,
  GET_EMPLOYEE_DETAILS_API,
  ADD_TASK_DETAILS_API,
  UPDATE_ALL_TASK_API,
  APPROVED_TASK_DETAILS_API,
  UPDATE_TASK_DETAILS_API,
  FORGOT_PASSWORD_API,
}
