import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Dispatch, SetStateAction } from "react";

interface HTDCProps {
  howToDialog: boolean;
  setHowToDialog: Dispatch<SetStateAction<boolean>>;
  staticVersion: boolean;
  setStaticVersion: Dispatch<SetStateAction<boolean>>;
}

export default function HowToDialogComponent({
  howToDialog,
  setHowToDialog,
  staticVersion,
  setStaticVersion,
}: HTDCProps) {
  return (
    <Dialog open={howToDialog} onClose={() => setHowToDialog(false)}>
      <DialogContent>
        <Typography component="div">
          <div>
            A soft little calendar—not too serious, just here to help keep
            Aria’s cuddle meter in the green.{" "}
            <FavoriteIcon
              sx={{
                color: "#f48fb1",
                fontSize: "1rem",
                verticalAlign: "middle",
              }}
            />
          </div>
          <hr />
          <span style={{ fontWeight: "bold" }}>Add a time block</span>
          <div style={{ marginLeft: "10px", marginBottom: "10px" }}>
            Press and hold an empty line next to a time, then drag to choose
            your visit time.
          </div>
          <span style={{ fontWeight: "bold" }}>Edit/Delete time block</span>
          <div style={{ marginLeft: "10px" }}>
            Tap a time block you made to update guests or delete it.
            <br />
            To change the time, just delete the block and make a new one.
          </div>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {staticVersion && (
            <Button
              onClick={() => {
                setStaticVersion(false);
                localStorage.setItem("staticVersion", "false");
              }}
              color="success"
              variant="contained"
            >
              Live Calendar
            </Button>
          )}

          {!staticVersion && (
            <Button
              onClick={() => {
                setHowToDialog(false);
                setStaticVersion(true);
                localStorage.setItem("staticVersion", "true");
              }}
              color="success"
              variant="contained"
            >
              Celebration
            </Button>
          )}

          <Button
            onClick={() => {
              localStorage.setItem("hasSeenInfoDialog", "true");
              setHowToDialog(false);
            }}
            color="primary"
            variant="contained"
          >
            Got it
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
