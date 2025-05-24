"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import jsonData from "../data/aria_data.json";
import { StaticCalendarEventType } from "@/types";

//formatting static stata for read only version
const staticData = jsonData.map((block) => ({
  id: String(block.id),
  title: block.name,
  start: new Date(block.startTime + "Z"), // ⬅️ tells JS it's UTC
  end: new Date(block.endTime + "Z"),
}));

export default function StaticCalendarView() {
  const [events, setEvents] = useState<StaticCalendarEventType[]>([]);

  useEffect(() => {
    setEvents(staticData);
  }, []);

  return (
    <>
      <FullCalendar
        plugins={[timeGridPlugin]}
        timeZone="local"
        initialView="timeGridDay"
        locale="en-US"
        events={events}
        allDaySlot={false}
        slotMaxTime="24:00:00"
        slotDuration="01:00:00"
        height="auto"
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "narrow",
          hour12: true,
        }}
        headerToolbar={{
          start: "prev",
          center: "title",
          end: "next",
        }}
        eventContent={(arg) => {
          const start = new Date(arg.event.startStr);
          const end = new Date(arg.event.endStr);
          const durationInMs = end.getTime() - start.getTime();
          const durationInHours = durationInMs / (1000 * 60 * 60);

          const isShort = durationInHours <= 1;

          return (
            <div
              style={{
                fontSize: isShort ? "0.7rem" : "0.9rem",
                padding: "2px 4px",
                whiteSpace: "normal",
                lineHeight: "1.2",
              }}
            >
              <div>
                {start.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
                {" - "}
                {end.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
                {" - "}
                {arg.event.title}
              </div>
            </div>
          );
        }}
        validRange={{
          start: "2025-04-21",
          end: "2025-05-08",
        }}
      />
    </>
  );
}
