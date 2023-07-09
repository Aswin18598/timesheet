import moment from "moment";
import React from "react";
import CalendarMonthView from "react-calendar-month-view";
export default function CalendarView() {
  const _renderDay = (day) => {
    const date = moment(day);
    console.log(date, "testtttt");

    const diff = date.diff(moment().startOf("day"));

    if (diff === -259200000 || diff === 259200000) {
      return (
        <div
          style={{
            boxSizing: "border-box",
            height: "100%",
            width: "80%",
          }}
        />
      );
    } else {
      return (
        <div
          style={{
            background: "white",
          }}
        />
      );
    }
  };
  return <CalendarMonthView renderDay={_renderDay} />;
}
