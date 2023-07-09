import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined"
import {
  CALENDAR_PAGE_PATH,
  DASHBOARD_PAGE_PATH,
  REPORT_PAGE_PATH,
  TIME_TRACKER_PAGE_PATH,
  PROJECT_PAGE_PATH,
  TEAM_PAGE_PATH,
  EMPLOYEE_PAGE_PATH,
} from "../routes/routePath"
import { useSelector } from "react-redux"
import { useTheme } from "@mui/material"

export default function Sidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { currentUser } = useSelector((state) => state.auth)
  const goToPage = (param) => {
    navigate(param)
  }
  const {} = useTheme()

  return (
    <div className="sidebar">
      <h2 className="title">
        <span>CRUD</span> Worksheet
      </h2>
      <ul className="menu">
        <li
          onClick={() => goToPage(TIME_TRACKER_PAGE_PATH)}
          className={pathname === TIME_TRACKER_PAGE_PATH ? "active" : ""}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
              stroke={
                pathname === TIME_TRACKER_PAGE_PATH ? "#6941C6" : "#667085"
              }
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.71 15.18L12.61 13.33C12.07 13.01 11.63 12.24 11.63 11.61V7.51001"
              stroke={
                pathname === TIME_TRACKER_PAGE_PATH ? "#6941C6" : "#667085"
              }
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>Time Tracker</span>
        </li>
        <li
          onClick={() => goToPage(CALENDAR_PAGE_PATH)}
          className={pathname === CALENDAR_PAGE_PATH ? "active" : ""}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 2V5"
              stroke={pathname === CALENDAR_PAGE_PATH ? "#6941C6" : "#667085"}
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16 2V5"
              stroke={pathname === CALENDAR_PAGE_PATH ? "#6941C6" : "#667085"}
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.5 9.09H20.5"
              stroke={pathname === CALENDAR_PAGE_PATH ? "#6941C6" : "#667085"}
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
              stroke={pathname === CALENDAR_PAGE_PATH ? "#6941C6" : "#667085"}
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.6947 13.7H15.7037"
              stroke={pathname === CALENDAR_PAGE_PATH ? "#6941C6" : "#667085"}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.6947 16.7H15.7037"
              stroke={pathname === CALENDAR_PAGE_PATH ? "#6941C6" : "#667085"}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.9955 13.7H12.0045"
              stroke="#292D32"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.9955 16.7H12.0045"
              stroke={pathname === CALENDAR_PAGE_PATH ? "#6941C6" : "#667085"}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.29431 13.7H8.30329"
              stroke={pathname === CALENDAR_PAGE_PATH ? "#6941C6" : "#667085"}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.29431 16.7H8.30329"
              stroke={pathname === CALENDAR_PAGE_PATH ? "#6941C6" : "#667085"}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span>Calendar</span>
        </li>
        {currentUser.userRole === "manager" ? (
          <li
            onClick={() => goToPage(TEAM_PAGE_PATH)}
            className={pathname.includes(TEAM_PAGE_PATH) ? "active" : ""}
          >
            <GroupsOutlinedIcon
              sx={{
                width: 24,
                height: 24,
                color: "#667085",
                stroke: pathname.includes(TEAM_PAGE_PATH)
                  ? "#6941C6"
                  : "#667085",
              }}
            />
            <span>Employees</span>
          </li>
        ) : null}
        {currentUser.userRole === "accountant" ? (
          <li
            onClick={() => goToPage(EMPLOYEE_PAGE_PATH)}
            className={pathname.includes(EMPLOYEE_PAGE_PATH) ? "active" : ""}
          >
            <GroupsOutlinedIcon
              sx={{
                width: 24,
                height: 24,
                color: "#667085",
                stroke: pathname.includes(EMPLOYEE_PAGE_PATH)
                  ? "#6941C6"
                  : "#667085",
              }}
            />
            <span>Employees</span>
          </li>
        ) : null}
      </ul>
      {/* <p>Analyse</p>
      <ul className="menu">
        <li>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.02 2.84001L3.63 7.04001C2.73 7.74001 2 9.23001 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.29001 21.19 7.74001 20.2 7.05001L14.02 2.72001C12.62 1.74001 10.37 1.79001 9.02 2.84001Z"
              stroke={pathname === DASHBOARD_PAGE_PATH ?  "#6941C6" : "#667085" }
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.5 18H13.5C15.15 18 16.5 16.65 16.5 15V12C16.5 10.35 15.15 9 13.5 9H10.5C8.85 9 7.5 10.35 7.5 12V15C7.5 16.65 8.85 18 10.5 18Z"
              stroke={pathname === DASHBOARD_PAGE_PATH ?  "#6941C6" : "#667085" }
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 9V18"
              stroke={pathname === DASHBOARD_PAGE_PATH ?  "#6941C6" : "#667085" }
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.5 13.5H16.5"
              stroke={pathname === DASHBOARD_PAGE_PATH ?  "#6941C6" : "#667085" }
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span>Dashboard</span>
        </li>
        <li>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.02 5.97C2.75 7.65 2 9.74 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2"
              stroke={pathname === REPORT_PAGE_PATH ?  "#6941C6" : "#667085" }
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5 12C5 15.87 8.13 19 12 19C15.87 19 19 15.87 19 12C19 8.13 15.87 5 12 5"
              stroke={pathname === REPORT_PAGE_PATH ?  "#6941C6" : "#667085" }
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8"
              stroke={pathname === REPORT_PAGE_PATH ?  "#6941C6" : "#667085" }
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span>Report</span>
        </li>
      </ul>
      <p>Analyse</p>
      <ul className="menu">
        <li>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.4 9.60001H9.59998V14.4H14.4V9.60001Z"
              stroke={pathname === PROJECT_PAGE_PATH ?  "#6941C6" : "#667085" }
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.79999 18C8.78999 18 9.59998 17.19 9.59998 16.2V14.4H7.79999C6.80999 14.4 6 15.21 6 16.2C6 17.19 6.80999 18 7.79999 18Z"
              stroke={pathname === PROJECT_PAGE_PATH ?  "#6941C6" : "#667085" }
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.79999 9.60001H9.59998V7.79999C9.59998 6.80999 8.78999 6 7.79999 6C6.80999 6 6 6.80999 6 7.79999C6 8.78999 6.80999 9.60001 7.79999 9.60001Z"
              stroke={pathname === PROJECT_PAGE_PATH ?  "#6941C6" : "#667085" }
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.4 9.60001H16.2C17.19 9.60001 18 8.78999 18 7.79999C18 6.80999 17.19 6 16.2 6C15.21 6 14.4 6.80999 14.4 7.79999V9.60001Z"
              stroke={pathname === PROJECT_PAGE_PATH ?  "#6941C6" : "#667085" }
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.2 18C17.19 18 18 17.19 18 16.2C18 15.21 17.19 14.4 16.2 14.4H14.4V16.2C14.4 17.19 15.21 18 16.2 18Z"
              stroke={pathname === PROJECT_PAGE_PATH ?  "#6941C6" : "#667085" }
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
              stroke={pathname === PROJECT_PAGE_PATH ?  "#6941C6" : "#667085" }
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span>Project</span>
        </li>
        <li>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.16 10.87C9.06 10.86 8.94 10.86 8.83 10.87C6.45 10.79 4.56 8.84 4.56 6.44C4.56 3.99 6.54 2 9 2C11.45 2 13.44 3.99 13.44 6.44C13.43 8.84 11.54 10.79 9.16 10.87Z"
              stroke={pathname === TEAM_PAGE_PATH ?  "#6941C6" : "#667085" }
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.41 4C18.35 4 19.91 5.57 19.91 7.5C19.91 9.39 18.41 10.93 16.54 11C16.46 10.99 16.37 10.99 16.28 11"
              stroke={pathname === TEAM_PAGE_PATH ?  "#6941C6" : "#667085" }
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4.15997 14.56C1.73997 16.18 1.73997 18.82 4.15997 20.43C6.90997 22.27 11.42 22.27 14.17 20.43C16.59 18.81 16.59 16.17 14.17 14.56C11.43 12.73 6.91997 12.73 4.15997 14.56Z"
              stroke={pathname === TEAM_PAGE_PATH ?  "#6941C6" : "#667085" }
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.34 20C19.06 19.85 19.74 19.56 20.3 19.13C21.86 17.96 21.86 16.03 20.3 14.86C19.75 14.44 19.08 14.16 18.37 14"
              stroke={pathname === TEAM_PAGE_PATH ?  "#6941C6" : "#667085" }
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span>Team</span>
        </li>
      </ul> */}
    </div>
  )
}
