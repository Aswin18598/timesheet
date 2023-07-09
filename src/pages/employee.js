import React, { useEffect, useMemo, useState } from "react"
import Layout from "../component/layout/Layout"
import { Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined"
import { EMPLOYEE_TASK_HISTORY_REQUEST } from "../redux/sagas/types"
import {
  Loader,
  calculateTimeDifference,
  calculateTotalWorkingHoursOfTheDay,
  renderFormattedDate,
  renderFormattedTime,
} from "../utils"
import MoreActionButton from "../component/timeTracker/MoreActionButton"
import NoDataMessage from "../component/timeTracker/NoDataMessage"
import { useSnackbar } from "notistack"
import { setEmployeeTaskHistory } from "../redux/sagas/employee/employeeSlice"
import ApproveDenyMenuList from "../component/employee/ApproveDenyMenuList"
import GlobalApproveDenyMenuList from "../component/employee/GlobalApproveDenyMenuList"
import { Link, useNavigate, useParams } from "react-router-dom"
import { TEAM_PAGE_PATH, TIME_TRACKER_PAGE_PATH } from "../routes/routePath"

const Employee = () => {
  const { empID } = useParams()
  const { employeeTaskHistory = {} } = useSelector((state) => state?.employee)
  const { currentUser } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.loader)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const [globalAnchorEl, setGlobalAnchorEl] = useState(null)
  const openMenu = useMemo(() => Boolean(anchorEl), [anchorEl])
  const openGlobalMenu = useMemo(
    () => Boolean(globalAnchorEl),
    [globalAnchorEl]
  )
  const [selectedTask, setSelectedTask] = useState(null)
  const { enqueueSnackbar } = useSnackbar()
  const handleMenuClick = (event, task) => {
    setAnchorEl(event.currentTarget)
    setSelectedTask({ ...task, enqueueSnackbar })
  }
  const handleGlobalMenuClick = (event, task) => {
    setGlobalAnchorEl(event.currentTarget)
    setSelectedTask({ task })
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const handleGlobalMenuClose = () => {
    setGlobalAnchorEl(null)
  }

  useEffect(() => {
    if (currentUser?.userRole !== "manager") {
      navigate(TIME_TRACKER_PAGE_PATH)
    }
    if (empID) {
      // do filter API call
      dispatch({
        type: EMPLOYEE_TASK_HISTORY_REQUEST,
        payload: { empID },
      })
    } else {
      dispatch(setEmployeeTaskHistory({}))
    }
  }, [empID, currentUser?.userRole])
  return (
    <Layout>
      {loading && <Loader />}
      <section className="employee">
        <div className="time-banner w-100 d-flex justify-content-between align-items-center p-2 pb-4">
          <Link
            className="d-flex align-items-center gap-1 text-decoration-none text-black"
            to={TEAM_PAGE_PATH}
          >
            <span>
              <ArrowBackIosOutlinedIcon
                sx={{ width: "14px", height: "14px" }}
              />
            </span>
            <span>Back</span>
          </Link>
          <Form className="d-flex gap-4 align-items-center w-50 justify-content-end">
            <Form.Control type="date" className="w-50" />
          </Form>
        </div>
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
                    <span>
                      <MoreActionButton
                        handleMenuClick={(event) =>
                          handleGlobalMenuClick(
                            event,
                            employeeTaskHistory[date]
                          )
                        }
                      />
                    </span>
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
                      <MoreActionButton
                        handleMenuClick={(event) =>
                          handleMenuClick(event, task)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <NoDataMessage message={"No Records Found!."} />
          )}
        </div>
      </section>
      <ApproveDenyMenuList
        openMenu={openMenu}
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        selectedTask={selectedTask}
      />
      <GlobalApproveDenyMenuList
        openMenu={openGlobalMenu}
        anchorEl={globalAnchorEl}
        handleMenuClose={handleGlobalMenuClose}
        selectedTask={selectedTask}
      />
    </Layout>
  )
}

export default Employee
