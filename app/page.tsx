"use client";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarView from "./components/Calendar";
import StaticCalendarView from "./components/StaticCalendar";
import Confetti from "./components/Confetti";
import Header from "./components/header/Header";
import WentHomeDialogComponent from "./components/WentHomeDialog";

export default function Home() {
  const [howToDialog, setHowToDialog] = useState(false);
  const [openDirectionsDialog, setOpenDirectionsDialog] = useState(false);
  const [wentHomeDialog, setWentHomeDialog] = useState(false);
  const [staticVersion, setStaticVersion] = useState(true);

  useEffect(() => {
    const storedVersion = localStorage.getItem("staticVersion");
    if (storedVersion && storedVersion === "false") {
      setStaticVersion(false);
    }
  }, []);

  useEffect(() => {
    if (!staticVersion) {
      const seenDialog = localStorage.getItem("hasSeenInfoDialog");
      if (!seenDialog) {
        setHowToDialog(true);
      }
      localStorage.setItem("hasSeenInfoDialog", "true");
    } else {
      setWentHomeDialog(true);
    }
  }, [staticVersion]);

  return (
    <main>
      <Header
        howToDialog={howToDialog}
        setHowToDialog={setHowToDialog}
        openDirectionsDialog={openDirectionsDialog}
        setOpenDirectionsDialog={setOpenDirectionsDialog}
      />

      {staticVersion && <StaticCalendarView />}
      {!staticVersion && <CalendarView />}

      {staticVersion && (
        <WentHomeDialogComponent
          wentHomeDialog={wentHomeDialog}
          setWentHomeDialog={setWentHomeDialog}
        />
      )}

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
              {/* <div style={{ marginTop: "7.5px" }}>
                (You don’t need to add your name as a guest—if left blank, it’ll
                just say ‘Aria’s friend’ on the calendar.)
              </div> */}
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

      <Dialog
        open={openDirectionsDialog}
        onClose={() => setOpenDirectionsDialog(false)}
        slotProps={{
          paper: {
            sx: {
              width: "100vw",
              maxWidth: "100vw",
              margin: 0,
              borderRadius: 0,
              height: "80vh",
              maxHeight: "80vh",
            },
          },
        }}
      >
        <DialogTitle>Directions to Aria’s Room</DialogTitle>
        <DialogContent>
          <Typography component="div">
            <div style={{ marginLeft: "-5px" }}>
              <a
                href="http://maps.apple.com/?q=300+Longwood+Ave,+Boston,+MA"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#1976d2",
                  textDecoration: "none",
                  fontWeight: 500,
                  display: "inline-flex",
                }}
              >
                <LaunchIcon
                  sx={{ color: "#f48fb1", transform: "scale(0.75)" }}
                />
                Hospital: 300 Longwood Ave, Boston MA
              </a>
              <br />
              <a
                href="http://maps.apple.com/?q=2+Blackfan+St,+Boston,+MA"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#1976d2",
                  textDecoration: "none",
                  fontWeight: 500,
                  display: "inline-flex",
                }}
              >
                <LaunchIcon
                  sx={{ color: "#f48fb1", transform: "scale(0.75)" }}
                />
                Parking: 2 Blackfan St, Boston MA
              </a>
            </div>
            <ul
              style={{
                paddingInlineStart: "17.5px",
                marginTop: "0px",
              }}
            >
              <li>Aria is in room 1045 &middot; Berthiaume Building.</li>
              <li>
                After parking, go to the lobby of the Main Building at 300
                Longwood.
              </li>
              <li>
                At the Main Lobby Information Desk tell them you are here to
                visit Aria Olson in room 1045 of the Berthiaume Building. <br />
                <div style={{ marginLeft: "10px" }}>
                  (I think you can just say &quot;Bert Building&quot;)
                </div>
              </li>
              <li>
                They will ask your relation to Aria. <br />
                <div style={{ marginLeft: "10px" }}>
                  (If you aren&apos;t a grandparent/great grandparent—I would
                  maybe tell them you are an aunt or uncle to be safe)
                </div>
              </li>
              <li>
                They will ask for your ID to create a temporary badge that will
                get you around the hospital.
              </li>
              <li>
                Follow signs for Berthiaume Building or ask for directions to
                10th floor &middot; room 1045.
              </li>
            </ul>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDirectionsDialog(false)}
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {staticVersion && <Confetti />}
    </main>
  );
}
