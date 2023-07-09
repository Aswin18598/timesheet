import React, { useEffect, useMemo, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import Layout from "../component/layout/Layout"
import Task from "../component/task"
import { TIME_TRACKER_REQUEST } from "../redux/sagas/types"
import {
  Loader,
  calculateTimeDifference,
  calculateTotalWorkingHoursOfTheDay,
  renderFormattedDate,
  renderFormattedTime,
} from "../utils"
import AddFilterTaskSection from "../component/addFilterTaskSection"
import MoreActionButton from "../component/timeTracker/MoreActionButton"
import MoreActionMenuList from "../component/timeTracker/MoreActionMenuList"
import { useSnackbar } from "notistack"
import NoDataMessage from "../component/timeTracker/NoDataMessage"
import EditDeleteMenuList from "../component/timeTracker/EditDeleteMenuList"
import TaskDeleteConfirmationModal from "../component/timeTracker/TaskDeleteConfirmationModal"

export default function TimeTracker() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [tempSelectedTask, setTempSelectedTask] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const handleClose = () => {
    setIsOpen(false)
  }
  const [anchorEl, setAnchorEl] = useState(null)
  const openMenu = useMemo(() => Boolean(anchorEl), [anchorEl])
  const handleMenuClick = (event, task) => {
    setAnchorEl(event.currentTarget)
    setTempSelectedTask({ ...task, enqueueSnackbar })
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const dispatch = useDispatch()
  const { taskLists } = useSelector((state) => state.Tasks)
  const { currentUser } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.loader)
  useEffect(() => {
    dispatch({
      type: TIME_TRACKER_REQUEST,
      payload: { empID: currentUser?.empID },
    })
  }, [])
  return (
    <Layout>
      {loading && <Loader />}
      <div className="activities">
        <AddFilterTaskSection setIsOpen={setIsOpen} />
        <h4 className="title">Activities</h4>
        {Object.keys(taskLists).length > 0 ? (
          Object.keys(taskLists).map((date, index) => (
            <div className="status mb-4" key={index}>
              <div className="time">
                <h4>{renderFormattedDate(date)}</h4>
                <div className="total-time">
                  <span>Total:</span>{" "}
                  <h4>
                    {calculateTotalWorkingHoursOfTheDay(
                      taskLists && taskLists[date] ? taskLists[date] : []
                    )}
                  </h4>
                </div>
              </div>
              {taskLists[date]?.map((task, index) => (
                <div className="workstatus" key={index}>
                  <div className="content">
                    <p title={task?.desc}>{task?.desc}</p>
                    <span>{task?.title}</span>
                  </div>
                  <div className={"timer"}>
                    <span
                      className={`${task?.isApproved ? "approved" : "pending"}`}
                    >
                      {task?.isApproved ? "Approved" : "Not yet approved"}
                    </span>
                    <h4>
                      {renderFormattedTime(task?.startTime)} -{" "}
                      {renderFormattedTime(task?.endTime)}
                    </h4>
                    <div className="border"></div>
                    <h4 className="hours">
                      {calculateTimeDifference(task?.startTime, task?.endTime)}
                    </h4>
                    <MoreActionButton
                      handleMenuClick={(event) => handleMenuClick(event, task)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <NoDataMessage />
        )}
      </div>
      <Modal
        show={isOpen}
        onHide={() => {
          handleClose()
          setSelectedTask(null)
          setTempSelectedTask(null)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="header-text">Add Time Entry</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Task
            setIsOpen={setIsOpen}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
          />
        </Modal.Body>
      </Modal>
      <EditDeleteMenuList
        setIsOpen={setIsOpen}
        openMenu={openMenu}
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        tempSelectedTask={tempSelectedTask}
        setSelectedTask={setSelectedTask}
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
      />
      <TaskDeleteConfirmationModal
        showDeleteModal={showDeleteModal}
        handleMenuClose={handleMenuClose}
        setShowDeleteModal={setShowDeleteModal}
        selectedTaskToDelete={selectedTask}
        setSelectedTask={setSelectedTask}
      />
    </Layout>
  )
}
