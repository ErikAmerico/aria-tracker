import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { EventClickArg } from "@fullcalendar/core";

//used elsewhere as well - Should be moved to a types/interfaces file. keep it DRY
type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
};

interface ETBProps {
  clickedEvent: EventClickArg | null;
  setClickedEvent: Dispatch<SetStateAction<EventClickArg | null>>;
  editValue: string;
  setEditValue: Dispatch<SetStateAction<string>>;
  setEvents: Dispatch<SetStateAction<CalendarEvent[]>>;
  setSnackbar: Dispatch<
    SetStateAction<{
      open: boolean;
      message: string;
      severity: "success" | "error" | "info" | "warning";
    }>
  >;
}

export default function EditTimeBlock({
  clickedEvent,
  setClickedEvent,
  editValue,
  setEditValue,
  setEvents,
  setSnackbar,
}: ETBProps) {
  return (
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
  );
}
