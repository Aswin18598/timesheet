import React from "react";
import CalendarView from "../component/calendar";
import Layout from "../component/layout/Layout";
import TimelineView from "../component/timeline";

export default function Calendar() {
  return (
    <Layout>
      <div className="calendar-details">
        <div
          className="calendar-view"
          style={{ position: "relative", top: "4rem" }}
        >
          <CalendarView />
        </div>
        <TimelineView />
      </div>
    </Layout>
  );
}
