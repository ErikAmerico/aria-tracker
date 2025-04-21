"use client";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const CalendarView = dynamic(() => import("./components/Calendar"), {
  ssr: false,
});

export default function Home() {
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setOpenDialog(true); // Always open on load
  }, []);
  return (
    <main>
      <h1
        className="text-xl font-semibold p-4"
        style={{ textAlign: "center", borderBottom: "1px solid black" }}
      >
        Aria&apos;s Visitors
      </h1>
      <CalendarView />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <Typography component="div">
            <span style={{ fontWeight: "bold" }}>Add a time block</span>
            <div style={{ marginLeft: "10px" }}>
              Tap and hold on and empty line next to a time, then drag to
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
    </main>
  );
}
