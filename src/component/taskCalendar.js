import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import Layout from "./layout/Layout"
// import { Button, ButtonGroup } from "react-bootstrap"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CALENDER_TASK_REQUEST } from "../redux/sagas/types"
import { Loader } from "../utils"

export function TaskCalendar() {
  const [tasks, setTasks] = useState([])
  const { calenderTasks } = useSelector((state) => state.calender)
  const { loading } = useSelector((state) => state.loader)
  const { currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const calendarRef = useRef()
  useEffect(() => {
    dispatch({
      type: CALENDER_TASK_REQUEST,
      payload: { empID: currentUser?.empID },
    })
  }, [])
  const formatEventStartAndEndTime = (date) => {
    const givenDate = new Date(date)
    const hour = `${givenDate.getUTCHours()}`.padStart(2, 0)
    const minute = `${givenDate.getUTCMinutes()}`.padStart(2, 0)
    return givenDate.toISOString().replace(/T.*$/, "") + `T${hour}:${minute}:00`
  }
  useEffect(() => {
    if (calenderTasks?.length) {
      const tempTasks = calenderTasks?.map((t) => ({
        title: t?.title,
        desc: t?.desc,
        start: formatEventStartAndEndTime(t?.startTime),
        end: formatEventStartAndEndTime(t?.endTime),
      }))
      setTasks([...tempTasks])
    }
  }, [calenderTasks])
  return (
    <Layout>
      {loading && <Loader />}
      <div style={{}} className="calender-container">
        {/* <div className="header-toolbar">
          <div className="views">
            <ButtonGroup aria-label="Basic example">
              <Button
                className={`week`}
               
              >
                Week
              </Button>
              <Button
                className={`day`}
              >
                Day
              </Button>
            </ButtonGroup>
          </div>
          <div className="actions-btn">
            <ButtonGroup aria-label="Basic example">
              <Button className="view-btn">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 2V5"
                    stroke={"#6941C6"}
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16 2V5"
                    stroke={"#6941C6"}
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3.5 9.09H20.5"
                    stroke={"#6941C6"}
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                    stroke={"#6941C6"}
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.6947 13.7H15.7037"
                    stroke={"#6941C6"}
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.6947 16.7H15.7037"
                    stroke={"#6941C6"}
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
                    stroke={"#6941C6"}
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.29431 13.7H8.30329"
                    stroke={"#6941C6"}
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.29431 16.7H8.30329"
                    stroke={"#6941C6"}
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                This week
              </Button>
              <Button
                className="prev"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 16.6L7.0667 11.1667C6.42503 10.525 6.42503 9.47499 7.0667 8.83333L12.5 3.39999"
                    stroke="#667085"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Button>
              <Button
                className="today-btn"
              >
                Today
              </Button>
              <Button
                className="prev"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.42505 16.6L12.8584 11.1667C13.5 10.525 13.5 9.47499 12.8584 8.83333L7.42505 3.39999"
                    stroke="#667085"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Button>
            </ButtonGroup>
          </div>
        </div> */}
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          themeSystem="bootstrap"
          dayHeaderContent={customDayHeader}
          allDaySlot={false}
          weekends={true}
          slotLabelFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: false,
          }}
          events={tasks}
          headerToolbar={{
            left: "timeGridWeek,timeGridDay",
            center: "title",
            right: "prev,today,next",
          }}
          eventContent={renderEventContent}
          ref={calendarRef}
        />
      </div>
    </Layout>
  )
}

// a custom render function
function renderEventContent(eventInfo) {
  const { desc } = eventInfo?.event?.extendedProps
  const { title } = eventInfo?.event
  return (
    <div className="events">
      <h5>{title}</h5>
      <p style={{ overflow: "hidden", textOverflow: "ellipsis" }} title={desc}>
        {desc}
      </p>
    </div>
  )
}
const customDayHeader = ({ date }, b, c) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <span>{date.toDateString()}</span>
      </div>
    </>
  )
}
