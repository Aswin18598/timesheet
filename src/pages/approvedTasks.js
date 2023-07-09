import React from "react"
import Layout from "../component/layout/Layout"
import { Loader, calculateStartAndEndDate, toHoursAndMinutes } from "../utils"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { TIME_TRACKER_PAGE_PATH } from "../routes/routePath"
import { filterRanges } from "../utils/constants"
import { APPROVED_TASK_REQUEST } from "../redux/sagas/types"
import { setApprovedTasksList } from "../redux/sagas/time-tracker/timeTrackerSlice"
import { useMemo } from "react"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material"
import { useState } from "react"

const ApprovedTasks = () => {
  const { loading } = useSelector((state) => state.loader)
  const { currentUser } = useSelector((state) => state.auth)
  const { approvedTasksList } = useSelector((state) => state.Tasks)
  const [range, setRange] = useState(3)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const yesterday = useMemo(
    () => new Date(new Date().setDate(new Date().getDate() - 1)),
    []
  )
  const twoMonthBefore = useMemo(
    () => new Date(new Date().setDate(new Date().getDate() - 58)),
    []
  )
  useEffect(() => {
    if (currentUser?.userRole !== "accountant") {
      navigate(TIME_TRACKER_PAGE_PATH)
    }
    if (range) {
      dispatch({
        type: APPROVED_TASK_REQUEST,
        payload: calculateStartAndEndDate(+range),
      })
    } else {
      dispatch(setApprovedTasksList([]))
    }
  }, [currentUser, range])
  const handleRangeFilterChange = (event) => {
    setRange(event.target.value)
  }
  const handleDateChange = (event) => {
    dispatch({
      type: APPROVED_TASK_REQUEST,
      payload: {
        startingDate: new Date(event.target.value).toISOString(),
        endingDate: new Date().toISOString(),
      },
    })
  }
  return (
    <Layout>
      {loading && <Loader />}
      <section className="approved-tasks">
        <h5>Employee Working History</h5>
        <div className="filter-section">
          <select
            onChange={handleRangeFilterChange}
            value={range}
            className="select"
            title="choose from date"
          >
            <option value={""}>Select From Date</option>
            {filterRanges.map((d) => (
              <option value={d.value} key={d.value}>
                {d.lable}
              </option>
            ))}
          </select>
          <input
            type="date"
            className="date"
            title="choose from date"
            onChange={handleDateChange}
            max={yesterday.toISOString().slice(0, 10)}
            min={twoMonthBefore.toISOString().slice(0, 10)}
            onKeyDown={(e) => e.preventDefault()}
          />
        </div>
        <div className="table-section">
          {approvedTasksList?.length > 0 ? (
            <div className="table-wrapper">
              <Paper
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  border: `0.5px solid ${theme.palette?.border?.main}`,
                }}
                elevation={0}
              >
                <TableContainer>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow
                        sx={{
                          "& .MuiTableCell-root": {
                            fontSize: "16px",
                            py: "0.7rem",
                            whiteSpace: "nowrap",
                            width: `${100 / 5}%`,
                          },
                        }}
                      >
                        <TableCell>Employee Name</TableCell>
                        <TableCell>Employee ID</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          Total Working Hours
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          Approved Working Hours
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {approvedTasksList?.map((employee) => {
                        return (
                          <TableRow
                            hover
                            key={employee._id}
                            sx={{
                              "& .MuiTableCell-root": {
                                fontSize: "15px",
                                width: `${100 / 5}%`,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                "& code": {
                                  color: theme.palette.primary?.main,
                                  fontSize: "15px",
                                },
                                "& p": {
                                  margin: 0,
                                  width: "14rem",
                                  overflowX: "hidden",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                  "& .link": {
                                    textDecoration: "none",
                                    color: "inherit",
                                    "&:hover": {
                                      textDecoration: "underline",
                                      color: theme.palette.primary.main,
                                    },
                                  },
                                  "&.userName": {
                                    textTransform: "capitalize",
                                  },
                                  "&.empID": {
                                    textTransform: "uppercase",
                                  },
                                },
                              },
                              "&:last-of-type .MuiTableCell-root": {
                                borderBottom: "none",
                              },
                            }}
                          >
                            <TableCell>
                              <p className="userName">
                                <Link
                                  to={{
                                    pathname: `/employee/${employee?._id}`,
                                  }}
                                  state={{ ...employee }}
                                  className="link"
                                >
                                  {employee?.userName}
                                </Link>
                              </p>
                            </TableCell>
                            <TableCell>
                              <p className="empID">{employee?._id}</p>
                            </TableCell>
                            <TableCell>
                              <p className="email">{employee?.email}</p>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              <p>
                                <code>
                                  {toHoursAndMinutes(
                                    employee?.totalWorkingHoursInMinutes
                                  )}
                                </code>
                              </p>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              <p>
                                <code>
                                  {toHoursAndMinutes(
                                    employee?.approvedWorkingHoursInMinutes
                                  )}
                                </code>
                              </p>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
          ) : (
            <div>
              <p>No Records Founds!.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default ApprovedTasks
