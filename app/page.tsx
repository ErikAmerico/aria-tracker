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
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import IconButton from "@mui/material/IconButton";
import { useSimpleVersionCheck } from "../hooks/useSimpleVersionCheck";
import CircularProgress from "@mui/material/CircularProgress";

const CalendarView = dynamic(() => import("./components/Calendar"), {
  ssr: false,
});

export default function Home() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDirections, setOpenDirections] = useState(false);
  const { showUpdateDialog } = useSimpleVersionCheck();

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
        <span style={{ marginLeft: "28px" }}>Aria&apos;s Visitors</span>
        <IconButton
          onClick={() => setOpenDialog(true)}
          size="small"
          disabled={openDialog}
          sx={{
            color: "#f48fb1",
          }}
        >
          <InfoOutlinedIcon fontSize="small" />
        </IconButton>
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

      <Dialog
        open={showUpdateDialog}
        onClose={() => {}}
        hideBackdrop
        slotProps={{
          paper: {
            sx: {
              width: "90vw",
              maxWidth: "90vw",
              height: "50vh",
              maxHeight: "50vh",
              margin: 5,
              borderRadius: 5,
              backgroundColor: "#fff3f8",
            },
          },
        }}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <CircularProgress sx={{ color: "#d81b60", mb: 2 }} />
          <Typography
            variant="h6"
            sx={{ color: "#d81b60", fontWeight: "bold", fontSize: "1.25rem" }}
          >
            Updating...
          </Typography>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
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
          <Button onClick={() => setOpenDirections(false)} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
