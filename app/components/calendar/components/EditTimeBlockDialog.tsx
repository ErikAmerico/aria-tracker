import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { ETBCPropsType } from "@/types";
import { updateTimeBlock, deleteTimeBlock } from "@/services/timeblocks";

export default function EditTimeBlockDialog({
  clientId,
  clickedEvent,
  setClickedEvent,
  editValue,
  setEditValue,
  setEvents,
  setSnackbar,
}: ETBCPropsType) {
  const deleteTBlock = async () => {
    if (
      clickedEvent?.event.extendedProps.clientId &&
      clickedEvent.event.extendedProps.clientId === clientId
    ) {
      await deleteTimeBlock(clickedEvent.event.id);

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
  };

  const updateTBlock = async () => {
    const updatedTitle = editValue.trim() || "Aria's friend";

    await updateTimeBlock(clickedEvent!.event.id, updatedTitle);

    setEvents((prev) =>
      prev.map((e) =>
        e.id === clickedEvent!.event.id ? { ...e, title: updatedTitle } : e
      )
    );

    setClickedEvent(null);
    setSnackbar({
      open: true,
      message: "Guests adjusted!",
      severity: "success",
    });
  };

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
        <Button onClick={deleteTBlock} color="error">
          Delete
        </Button>
        <Button onClick={() => setClickedEvent(null)}>Cancel</Button>
        <Button onClick={updateTBlock} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
