import React from "react"
import { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { EMPLOYEE_PAGE_PATH } from "../routes/routePath"
import Layout from "../component/layout/Layout"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import { Box, Chip, Tooltip, useTheme } from "@mui/material"
import {
  calculateTimeDifference,
  calculateTotalWorkingHoursOfTheDay,
  groupTasksAsPerDate,
  renderFormattedDate,
  renderFormattedTime,
  toHoursAndMinutes,
} from "../utils"
import { useMemo } from "react"
import NoDataMessage from "../component/timeTracker/NoDataMessage"

const EmployeeWorkHistory = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()
  useEffect(() => {
    if (!state) {
      navigate(EMPLOYEE_PAGE_PATH)
    }
  }, [state])
  const employeeTaskHistory = useMemo(() => {
    if (state?.data?.length) {
      return groupTasksAsPerDate(state?.data)
    }
    return {}
  }, [state?.data])
  return (
    <Layout>
      <section className="employee-work-history">
        <h5>EmployeeWorkHistory</h5>
        <div className="table-container">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              "& p": { m: 0 },
              p: "1rem 0",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Link
                className="d-flex align-items-center gap-1 text-decoration-none text-black"
                to={EMPLOYEE_PAGE_PATH}
              >
                <span>
                  <ArrowBackIosOutlinedIcon
                    sx={{ width: "14px", height: "14px" }}
                  />
                </span>
                <span>Back</span>
              </Link>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Tooltip title={"Employee Name"}>
                <Chip label={state?.userName} variant="outlined" />
              </Tooltip>
              <Tooltip title={"Employee ID"}>
                <Chip
                  label={state?._id}
                  variant="outlined"
                  sx={{ textTransform: "uppercase" }}
                />
              </Tooltip>
              <Tooltip title={"Employee Email"}>
                <Chip label={state?.email} variant="outlined" />
              </Tooltip>
              <Tooltip title={"Total Working Hours"}>
                <Chip
                  label={toHoursAndMinutes(state?.totalWorkingHoursInMinutes)}
                  variant="outlined"
                  sx={{
                    borderColor: theme.palette?.primary?.main,
                    color: theme.palette?.primary?.main,
                  }}
                />
              </Tooltip>
              <Tooltip title={"Approved Working Hours"}>
                <Chip
                  label={toHoursAndMinutes(
                    state?.approvedWorkingHoursInMinutes
                  )}
                  variant="outlined"
                  sx={{
                    borderColor: theme.palette?.approved?.main,
                    color: theme.palette?.approved?.main,
                  }}
                />
              </Tooltip>
            </Box>
          </Box>
          <div className="p-2">
            <h4 className="title">Activities</h4>
            {Object.keys(employeeTaskHistory).length > 0 ? (
              Object.keys(employeeTaskHistory).map((date, index) => (
                <div className="status mb-4" key={index}>
                  <div className="time">
                    <h4>{renderFormattedDate(date)}</h4>
                    <div className="total-time">
                      <span>Total:</span>{" "}
                      <h4>
                        {calculateTotalWorkingHoursOfTheDay(
                          employeeTaskHistory && employeeTaskHistory[date]
                            ? employeeTaskHistory[date]
                            : []
                        )}
                      </h4>
                    </div>
                  </div>
                  {employeeTaskHistory[date]?.map((task, index) => (
                    <div className="workstatus" key={index}>
                      <div className="content">
                        <p title={task?.desc}>{task?.desc}</p>
                        <span>{task?.title}</span>
                      </div>
                      <div className={"timer"}>
                        <span
                          className={`${
                            task?.isApproved ? "approved" : "pending"
                          }`}
                        >
                          {task?.isApproved ? "Approved" : "Not yet approved"}
                        </span>
                        <h4>
                          {renderFormattedTime(task?.startTime)} -{" "}
                          {renderFormattedTime(task?.endTime)}
                        </h4>
                        <div className="border"></div>
                        <h4 className="hours">
                          {calculateTimeDifference(
                            task?.startTime,
                            task?.endTime
                          )}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <NoDataMessage message={"No Records Found!."} />
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default EmployeeWorkHistory
