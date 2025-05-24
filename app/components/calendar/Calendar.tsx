"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { DateSelectArg } from "@fullcalendar/core";
import { EventClickArg } from "@fullcalendar/core";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { pusherClient } from "@/lib/pusher-client";
import TimeBlock from "./components/TimeBlockDialog";
import EditTimeBlock from "./components/EditTimeBlockDialog";
import {
  CalendarEventType,
  SnackbarType,
  SelectedRangeType,
  TimeBlockType,
} from "@/types";
import { getLocalDateString, getSlotMinTime } from "@/utils/dateAndTime";

export default function CalendarView() {
  const [events, setEvents] = useState<CalendarEventType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<SelectedRangeType | null>(
    null
  );
  const [clickedEvent, setClickedEvent] = useState<EventClickArg | null>(null);
  const [formValue, setFormValue] = useState("");
  const [editValue, setEditValue] = useState("");
  const [snackbar, setSnackbar] = useState<SnackbarType>({
    open: false,
    message: "",
    severity: "success",
  });
  const [viewDate, setViewDate] = useState(new Date());

  useEffect(() => {
    pusherClient.subscribe("aria-calendar");

    const handler = (data: CalendarEventType) => {
      console.log("new-block event received:", data);
      setEvents((prev) => {
        const alreadyExists = prev.some((e) => e.id === data.id);
        if (alreadyExists) return prev;
        return [...prev, data];
      });
    };

    pusherClient.bind("new-block", handler);

    pusherClient.bind(
      "update-block",
      ({ id, title }: { id: string; title: string }) => {
        setEvents((prev) =>
          prev.map((event) =>
            event.id === String(id) ? { ...event, title } : event
          )
        );
      }
    );

    pusherClient.bind("delete-block", ({ id }: { id: string }) => {
      setEvents((prev) => prev.filter((event) => event.id !== id));
    });

    return () => {
      pusherClient.unbind("new-block", handler);
      pusherClient.unsubscribe("aria-calendar");
    };
  }, []);

  const fetchEvents = async () => {
    const res = await fetch("/api/timeblocks");
    const data = await res.json();

    const mapped = data.map((block: TimeBlockType) => ({
      id: String(block.id),
      title: block.name,
      start: block.startTime,
      end: block.endTime,
      extendedProps: {
        clientId: block.clientId,
      },
    }));

    setEvents(mapped);
  };

  const handleDateSelect = (info: DateSelectArg) => {
    setSelectedRange({ start: info.startStr, end: info.endStr });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormValue("");
    setSelectedRange(null);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    let clientId = localStorage.getItem("clientId");
    if (!clientId) {
      clientId =
        self.crypto?.randomUUID?.() ?? Math.random().toString(36).substring(2);
      localStorage.setItem("clientId", clientId);
    }
  }, []);

  const handleEventClick = async (clickInfo: EventClickArg) => {
    const clientId = localStorage.getItem("clientId");
    if (clickInfo.event.extendedProps.clientId === clientId) {
      setClickedEvent(clickInfo);
      setEditValue(clickInfo.event.title);
    }
  };

  return (
    <>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        timeZone="local"
        selectLongPressDelay={200}
        selectOverlap={false}
        initialView="timeGridDay"
        locale="en-US"
        selectable={true}
        selectMirror={true}
        select={handleDateSelect}
        events={events}
        allDaySlot={false}
        datesSet={({ start }) => {
          if (start.toDateString() !== viewDate.toDateString()) {
            setViewDate(start);
          }
        }}
        slotMinTime={getSlotMinTime(viewDate)}
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
        initialDate={getLocalDateString()}
        validRange={{ start: getLocalDateString() }}
        eventOverlap={false}
        eventClick={handleEventClick}
      />

      <TimeBlock
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        selectedRange={selectedRange}
        formValue={formValue}
        setFormValue={setFormValue}
        setSnackbar={setSnackbar}
      />

      <EditTimeBlock
        clickedEvent={clickedEvent}
        setClickedEvent={setClickedEvent}
        editValue={editValue}
        setEditValue={setEditValue}
        setEvents={setEvents}
        setSnackbar={setSnackbar}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
