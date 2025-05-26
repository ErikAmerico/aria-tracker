import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { TBPropsType } from "@/types";
import { addTimeBlock } from "@/services/timeblocks";

export default function TimeBlockDialog({
  isModalOpen,
  handleCancel,
  selectedRange,
  formValue,
  setFormValue,
  setSnackbar,
}: TBPropsType) {
  const handleOk = async () => {
    try {
      const title = formValue.trim() || "Aria's friend";
      const clientId = localStorage.getItem("clientId") || "";

      await addTimeBlock(
        title,
        selectedRange!.start,
        selectedRange!.end,
        clientId
      );

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

  return (
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
  );
}
