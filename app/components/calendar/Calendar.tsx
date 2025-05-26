"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { DateSelectArg } from "@fullcalendar/core";
import { EventClickArg } from "@fullcalendar/core";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TimeBlockDialog from "./components/TimeBlockDialog";
import EditTimeBlockDialog from "./components/EditTimeBlockDialog";
import { CalendarEventType, SnackbarType, SelectedRangeType } from "@/types";
import { getLocalDateString, getSlotMinTime } from "@/utils/dateAndTime";
import RenderTimeBlock from "./components/TimeBlockRenderer";
import { usePusherCalendar } from "@/hooks/usePusherCalendar";
import { getOrCreateClientId } from "@/utils/clientId";
import { getTimeBlocks } from "@/services/timeblocks";

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
    getTimeBlocks().then(setEvents);
    getOrCreateClientId();
  }, []);

  usePusherCalendar({ setEvents });

  const handleDateSelect = (info: DateSelectArg) => {
    setSelectedRange({ start: info.startStr, end: info.endStr });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormValue("");
    setSelectedRange(null);
  };

  const handleEventClick = async (clickInfo: EventClickArg) => {
    const clientId = getOrCreateClientId();
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
        eventContent={(arg) => <RenderTimeBlock {...arg} />}
        initialDate={getLocalDateString()}
        validRange={{ start: getLocalDateString() }}
        eventOverlap={false}
        eventClick={handleEventClick}
      />

      <TimeBlockDialog
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        selectedRange={selectedRange}
        formValue={formValue}
        setFormValue={setFormValue}
        setSnackbar={setSnackbar}
      />

      <EditTimeBlockDialog
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
