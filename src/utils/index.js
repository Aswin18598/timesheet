import { createTheme } from "@mui/material"
import moment from "moment"
import { Spinner } from "react-bootstrap"

const CustomMessage = (message, type, enqueueSnackbar) => {
  enqueueSnackbar(message, {
    variant: type,
    persist: ["success", "info", "error"].includes(type) ? false : true,
  })
}
const groupTasksAsPerDate = (allTasks = []) => {
  const reduceKey = "date"
  return allTasks.reduce((acc, curr) => {
    const key = curr[reduceKey]
    if (!acc[key]) {
      acc[key] = []
    }
    // Add object to list for given key's value
    acc[key]?.push(curr)
    return acc
  }, {})
}
const renderFormattedTime = (date) => {
  const givenDate = new Date(date)
  const hour = `${givenDate.getUTCHours()}`.padStart(2, 0)
  const minute = `${givenDate.getUTCMinutes()}`.padStart(2, 0)
  return `${hour} : ${minute}`
}
const isToday = (date) =>
  new Date(date).getFullYear() === new Date().getFullYear() &&
  new Date(date).getMonth() === new Date().getMonth() &&
  new Date(date).getDate() === new Date().getDate()
const isYesterday = (date) => {
  const givenDate = new Date(date)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return (
    givenDate.getDate() === yesterday.getDate() &&
    givenDate.getMonth() === yesterday.getMonth() &&
    givenDate.getFullYear() === yesterday.getFullYear()
  )
}
const renderFormattedDate = (date) => {
  let _date = "--/--/----"
  const is_today = isToday(date)
  const is_yesterday = isYesterday(date)
  if (is_today) {
    _date = "Today"
  } else if (is_yesterday) {
    _date = "Yesterday"
  } else {
    _date = new Date(date).toDateString()
  }
  return _date
}
const calculateTimeDifference = (startTime, endTime) => {
  const _startingTime = moment(startTime).utc(true).toString()
  const _endingTime = moment(endTime).toString()
  return moment(moment(_endingTime).diff(_startingTime)).format("HH:mm:ss")
}

const calculateTotalWorkingHoursOfTheDay = (aDaysWorkingHoursDetails = []) => {
  let sum = 0
  aDaysWorkingHoursDetails.forEach((task) => {
    const startingTimeHour = new Date(task?.startTime).getUTCHours() * 3600000
    const startingTimeMinutes =
      new Date(task?.startTime).getUTCMinutes() * 60000
    const startingTime = startingTimeHour + startingTimeMinutes
    const endingTimeHour = new Date(task?.endTime).getUTCHours() * 3600000
    const endingTimeMinutes = new Date(task?.endTime).getUTCMinutes() * 60000
    const endingTime = endingTimeHour + endingTimeMinutes
    const totalHourPerTask = endingTime - startingTime
    sum += totalHourPerTask
  })
  return moment.utc(sum).format("HH:mm:ss")
}

const Loader = () => {
  return (
    <div className="loader">
      <Spinner
        as="span"
        animation="border"
        role="status"
        aria-hidden="true"
        variant="light"
      />
    </div>
  )
}
// mui theme
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#6941c6", contrastText: "#ffffff" },
    border: { main: "#d0d5dd", contrastText: "#ffffff" },
    approved: { main: "#0d6efd", contrastText: "#ffffff" },
  },
})
const calculateStartAndEndDate = (range = 1) => {
  let startingDate = new Date()
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
  const aWeekBefore = new Date(new Date().setDate(new Date().getDate() - 6))
  const aMonthBefore = new Date(new Date().setDate(new Date().getDate() - 29))
  switch (range) {
    case 1:
      startingDate = yesterday
      break
    case 2:
      startingDate = aWeekBefore
      break
    case 3:
      startingDate = aMonthBefore
      break

    default:
      startingDate = yesterday
      break
  }
  return {
    startingDate: startingDate.toISOString(),
    endingDate: new Date().toISOString(),
  }
}
const toHoursAndMinutes = (totalMinutes) => {
  const hours = `${Math.floor(totalMinutes / 60)}`.padStart(2, "0")
  const minutes = `${totalMinutes % 60}`.padStart(2, "0")
  return `${hours}:${minutes}:00`
}

export {
  CustomMessage,
  Loader,
  groupTasksAsPerDate,
  renderFormattedTime,
  renderFormattedDate,
  calculateTimeDifference,
  calculateTotalWorkingHoursOfTheDay,
  theme,
  calculateStartAndEndDate,
  toHoursAndMinutes,
}
