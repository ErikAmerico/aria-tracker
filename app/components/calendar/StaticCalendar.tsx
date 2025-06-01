"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import jsonData from "@/app/data/aria_data.json";
import { StaticCalendarEventType } from "@/types";
import RenderTimeBlock from "./components/TimeBlockRenderer";

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
        eventContent={(arg) => <RenderTimeBlock {...arg} />}
        validRange={{
          start: "2025-04-21",
          end: "2025-05-08",
        }}
      />
    </>
  );
}
