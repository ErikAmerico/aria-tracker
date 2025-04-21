"use client";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import LaunchIcon from "@mui/icons-material/Launch";

const CalendarView = dynamic(() => import("./components/Calendar"), {
  ssr: false,
});

export default function Home() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDirections, setOpenDirections] = useState(false);

  useEffect(() => {
    setOpenDialog(true); // Always open on load
  }, []);
  return (
    <main>
      <h1
        className="text-xl font-semibold p-4"
        style={{
          textAlign: "center",
          borderBottom: "1px solid lightgray",
        }}
      >
        Aria&apos;s Visitors
        <br />
        <Button
          onClick={() => setOpenDirections(true)}
          variant="text"
          size="small"
          disabled={openDirections}
          sx={{
            mt: 1,
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "0.875rem",
            padding: "4px 12px",
            borderColor: "#1976d2",
            backgroundColor: "#f48fb1",
            color: "#fce4ec",
            "&:hover": {
              backgroundColor: "#fce4ec",
              borderColor: "#f06292",
              color: "#ad1457",
            },
            marginBottom: "5px",
            marginTop: "-5px",
          }}
        >
          Directions
        </Button>
      </h1>
      <CalendarView />
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <Typography component="div">
            <span style={{ fontWeight: "bold" }}>Add a time block</span>
            <div style={{ marginLeft: "10px" }}>
              Tap and hold on an empty line next to a time, then drag to
              highlight how long you&apos;ll stay.
            </div>
            <br />
            <span style={{ fontWeight: "bold" }}>Edit/Delete time block</span>
            <div style={{ marginLeft: "10px" }}>
              Tap a time block you made to update guests or delete it.
              <br />
              To change the time, just delete the block and make a new one.
            </div>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            color="primary"
            variant="contained"
          >
            Got it
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDirections}
        onClose={() => setOpenDirections(false)}
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
            <a
              href="http://maps.apple.com/?q=300+Longwood+Ave,+Boston,+MA"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Hospital: 300 Longwood Ave, Boston MA
              <LaunchIcon sx={{ color: "#f48fb1", transform: "scale(0.5)" }} />
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
              }}
            >
              Parking: 2 Blackfan St, Boston MA
              <LaunchIcon sx={{ color: "#f48fb1", transform: "scale(0.5)" }} />
            </a>
            <div style={{ marginLeft: "5px", marginTop: "2.5px" }}>
              - Aria is in room 1045 of the Berthiaume(Bert) Building
            </div>
            <div style={{ marginLeft: "5px", marginTop: "2.5px" }}>
              - After parking, go to the lobby of the main building at 300
              longwood.
            </div>
            <div style={{ marginLeft: "5px", marginTop: "2.5px" }}>
              - At the Main Lobby Information Desk tell them you are here to
              visit Aria Olson in room 1045 of the Berthiaume Building. (I think
              you can just say &quot;Bert Building&quot;)
            </div>
            <div style={{ marginLeft: "5px", marginTop: "2.5px" }}>
              - They will ask your relation to Aria <br />
              <div style={{ marginLeft: "10px" }}>
                (If you aren&apos;t a grandparent/great grandparent &middot; I
                would just tell them you are an aunt or uncle to be safe)
              </div>
            </div>
            <div style={{ marginLeft: "5px", marginTop: "2.5px" }}>
              - They will ask for you ID to create a temporary bade that will
              get you around the hospital
            </div>
            <div style={{ marginLeft: "5px", marginTop: "2.5px" }}>
              - Follow signs for Berthiaume Building or ask for directions to
              10th floor &middot; room 1045
            </div>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDirections(false)} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
