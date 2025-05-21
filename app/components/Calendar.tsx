"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { DateSelectArg } from "@fullcalendar/core";
import { EventClickArg } from "@fullcalendar/core";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { pusherClient } from "../../lib/pusher-client";

type Event = {
  id: string;
  title: string;
  start: string;
  end: string;
};

export default function CalendarView() {
  const [events, setEvents] = useState<Event[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<{
    start: string;
    end: string;
  } | null>(null);
  const [clickedEvent, setClickedEvent] = useState<EventClickArg | null>(null);
  const [formValue, setFormValue] = useState("");
  const [editValue, setEditValue] = useState("");
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  const [viewDate, setViewDate] = useState(new Date());

  useEffect(() => {
    pusherClient.subscribe("aria-calendar");

    const handler = (data: Event) => {
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

    type TimeBlock = {
      id: number;
      name: string;
      startTime: string;
      endTime: string;
      clientId: string;
    };

    const mapped = data.map((block: TimeBlock) => ({
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

  const handleOk = async () => {
    try {
      const title = formValue.trim() || "Aria's friend";
      const clientId = localStorage.getItem("clientId") || "";

      await fetch("/api/timeblocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          start: selectedRange!.start,
          end: selectedRange!.end,
          clientId,
        }),
      });

      setFormValue("");

      setSnackbar({
        open: true,
        message: "Time block added!",
        severity: "success",
      });
      handleCancel();
    } catch (err) {
      console.log(err);
    }
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

  function getLocalDateString(): string {
    const today = new Date();
    return (
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0")
    );
  }

  const handleEventClick = async (clickInfo: EventClickArg) => {
    const clientId = localStorage.getItem("clientId");
    if (clickInfo.event.extendedProps.clientId === clientId) {
      setClickedEvent(clickInfo);
      setEditValue(clickInfo.event.title);
    }
  };

  function getSlotMinTime(viewDate: Date): string {
    const now = new Date();
    const isToday = now.toDateString() === viewDate.toDateString();

    if (isToday) {
      const hours = now.getHours().toString().padStart(2, "0");
      return `${hours}:00:00`; // rounded down to the hour
    }

    return "00:00:00"; // full day for other dates
  }

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

      <Dialog open={isModalOpen} onClose={handleCancel} fullWidth maxWidth="sm">
        <DialogTitle>Create Time Block</DialogTitle>
        <DialogContent dividers>
          {selectedRange && (
            <div style={{ marginBottom: 16 }}>
              <Typography variant="body2">
                <strong>Date:</strong>{" "}
                {new Date(selectedRange.start).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Typography>
              <Typography variant="body2">
                <strong>Time:</strong>{" "}
                {new Date(selectedRange.start).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}{" "}
                –{" "}
                {new Date(selectedRange.end).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </Typography>
            </div>
          )}

          <TextField
            fullWidth
            label="Guests (optional)"
            variant="outlined"
            placeholder="Who's coming to visit?"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleOk} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={!!clickedEvent}
        onClose={() => setClickedEvent(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Time Block</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            label="Guests"
            variant="outlined"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={async () => {
              const clientId = localStorage.getItem("clientId");

              if (
                clickedEvent?.event.extendedProps.clientId &&
                clickedEvent.event.extendedProps.clientId === clientId
              ) {
                await fetch(`/api/timeblocks/${clickedEvent.event.id}`, {
                  method: "DELETE",
                });

                setEvents((prev) =>
                  prev.filter((event) => event.id !== clickedEvent.event.id)
                );

                setClickedEvent(null);
                setSnackbar({
                  open: true,
                  message: "Time block deleted!",
                  severity: "success",
                });
              }
            }}
            color="error"
          >
            Delete
          </Button>
          <Button onClick={() => setClickedEvent(null)}>Cancel</Button>
          <Button
            onClick={async () => {
              const updatedTitle = editValue.trim() || "Aria's friend";

              await fetch(`/api/timeblocks/${clickedEvent!.event.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: updatedTitle }),
              });

              setEvents((prev) =>
                prev.map((e) =>
                  e.id === clickedEvent!.event.id
                    ? { ...e, title: updatedTitle }
                    : e
                )
              );

              setClickedEvent(null);
              setSnackbar({
                open: true,
                message: "Guests adjusted!",
                severity: "success",
              });
            }}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
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
