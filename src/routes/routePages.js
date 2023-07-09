import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "../pages/login"
import TimeTracker from "../pages/timeTracker"
import {
  CALENDAR_PAGE_PATH,
  EMPLOYEE_PAGE_PATH,
  FORGOT_PAGE_PATH,
  LOGIN_PAGE_PATH,
  RESET_PASSWORD_PAGE_PATH,
  TEAM_PAGE_PATH,
  TIME_TRACKER_PAGE_PATH,
} from "./routePath"
import Calendar from "../pages/calendar"
import { SnackbarProvider } from "notistack"
import { TaskCalendar } from "../component/taskCalendar"
import ForgotPassword from "../pages/forgotPassword"
import ResetPassword from "../pages/resetPassword"
import PublicRoute from "../protectedRoutes/PublicRoute"
import PrivateRoute from "../protectedRoutes/PrivateRoute"
import NotFound from "../pages/NotFound"
import Employee from "../pages/employee"
import ApprovedTasks from "../pages/approvedTasks"
import EmployeeWorkHistory from "../pages/employeeWorkHistory"
import EmployeeLists from "../pages/employeeLists"

export default function RoutePages() {
  return (
    <Router>
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={5000}
      >
        <Routes>
          <Route
            path={LOGIN_PAGE_PATH}
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path={FORGOT_PAGE_PATH}
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path={RESET_PASSWORD_PAGE_PATH}
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />
          <Route
            path={CALENDAR_PAGE_PATH}
            element={
              <PrivateRoute>
                <TaskCalendar />
              </PrivateRoute>
            }
          />
          <Route
            path={TIME_TRACKER_PAGE_PATH}
            element={
              <PrivateRoute>
                <TimeTracker />
              </PrivateRoute>
            }
          />
          <Route path={TEAM_PAGE_PATH}>
            <Route
              index
              element={
                <PrivateRoute>
                  <EmployeeLists />
                </PrivateRoute>
              }
            />
            <Route
              path={":empID"}
              element={
                <PrivateRoute>
                  <Employee />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path={EMPLOYEE_PAGE_PATH}>
            <Route
              index
              element={
                <PrivateRoute>
                  <ApprovedTasks />
                </PrivateRoute>
              }
            />
            <Route
              path=":empID"
              element={
                <PrivateRoute>
                  <EmployeeWorkHistory />
                </PrivateRoute>
              }
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </SnackbarProvider>
    </Router>
  )
}
