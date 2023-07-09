import { useSnackbar } from "notistack"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { ADD_TASK_REQUEST, UPDATE_TASK_REQUEST } from "../redux/sagas/types"
import { useEffect } from "react"

function Task({ setIsOpen, selectedTask, setSelectedTask }) {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.auth)
  const { enqueueSnackbar } = useSnackbar()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  useEffect(() => {
    if (selectedTask) {
      const date = new Date(selectedTask?.date)
      const startingTimeHour = `${new Date(
        selectedTask?.startTime
      ).getUTCHours()}`.padStart(2, "0")
      const startingTimeMinute = `${new Date(
        selectedTask?.startTime
      ).getUTCMinutes()}`.padStart(2, "0")
      const endingTimeHour = `${new Date(
        selectedTask?.endTime
      ).getUTCHours()}`.padStart(2, "0")
      const endingTimeMinute = `${new Date(
        selectedTask?.endTime
      ).getUTCMinutes()}`.padStart(2, "0")
      const selectedDate = `${date.getUTCDate()}`.padStart(2, "0")
      const selectedMonth = `${date.getUTCMonth() + 1}`.padStart(2, "0")
      const formattedValues = {
        startTime: `${startingTimeHour}:${startingTimeMinute}`,
        endTime: `${endingTimeHour}:${endingTimeMinute}`,
        title: selectedTask?.title,
        desc: selectedTask?.desc,
        date: `${date.getUTCFullYear()}-${selectedMonth}-${selectedDate}`,
      }
      reset(formattedValues)
    }
  }, [selectedTask])
  const onSubmit = (data) => {
    const { startTime, endTime, date, desc, title } = data
    const isStartTime = startTime.split(":")
    const isEndTime = endTime.split(":")
    const startingTime = new Date(
      new Date(date).getTime() +
        +isStartTime[0] * 3600000 +
        +isStartTime[1] * 60000
    ).toISOString()
    const endingTime = new Date(
      new Date(date).getTime() + +isEndTime[0] * 3600000 + +isEndTime[1] * 60000
    ).toISOString()
    const requestData = {
      date: date,
      startTime: startingTime,
      endTime: endingTime,
      empID: currentUser?.empID,
      title,
      desc,
    }
    if (selectedTask) {
      dispatch({
        type: UPDATE_TASK_REQUEST,
        payload: {
          setIsOpen,
          requestData,
          enqueueSnackbar,
          id: selectedTask?._id,
          empID: currentUser?.empID,
        },
      })
    } else {
      dispatch({
        type: ADD_TASK_REQUEST,
        payload: {
          setIsOpen,
          requestData,
          enqueueSnackbar,
          empID: currentUser?.empID,
        },
      })
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Form.Label htmlFor="inputPassword5">
          <span className="input-header-text"> Time and date</span>
        </Form.Label>
        <div className="date-picker-parent mb-2">
          <div className="start-end-time d-flex align-items-center gap-2 w-100 justify-content-between">
            <Form.Control
              type="time"
              {...register("startTime")}
              required
              className="d-flex align-items-center shadow-none"
            />{" "}
            -
            <Form.Control
              type="time"
              {...register("endTime")}
              required
              className="d-flex align-items-center shadow-none"
            />
            <Form.Control
              type="date"
              {...register("date")}
              required
              className="d-flex align-items-center shadow-none"
              max={new Date().toISOString().slice(0, 10)}
            />
          </div>
        </div>
      </div>
      <div className="mb-2">
        <Form.Label htmlFor="inputPassword5">
          <span className="input-header-text">Title</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your title"
          className="input-box shadow-none"
          required
          {...register("title")}
          maxLength={50}
        />
      </div>
      <div className="mb-2">
        <Form.Label htmlFor="inputPassword5">
          <span className="input-header-text">Description</span>
        </Form.Label>
        <FloatingLabel controlId="floatingTextarea2">
          <Form.Control
            as="textarea"
            placeholder="..."
            className="p-1 h-25 shadow-none"
            style={{ resize: "none" }}
            required
            {...register("desc")}
          />
        </FloatingLabel>
      </div>
      <div className="modal-footer">
        <Button
          className="cancel-btn"
          onClick={() => {
            setIsOpen(false)
            setSelectedTask(null)
          }}
        >
          Cancel
        </Button>
        {selectedTask ? (
          <Button className="add-btn" type="submit">
            Update
          </Button>
        ) : (
          <Button className="add-btn" type="submit">
            Add
          </Button>
        )}
      </div>
    </form>
  )
}
export default Task
