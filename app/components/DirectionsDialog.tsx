import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { DDCPropsType } from "@/types";

export default function DirectionDialogComponent({
  openDirectionsDialog,
  setOpenDirectionsDialog,
}: DDCPropsType) {
  return (
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
              <LaunchIcon sx={{ color: "#f48fb1", transform: "scale(0.75)" }} />
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
              <LaunchIcon sx={{ color: "#f48fb1", transform: "scale(0.75)" }} />
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
              At the Main Lobby Information Desk tell them you are here to visit
              Aria Olson in room 1045 of the Berthiaume Building. <br />
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
              Follow signs for Berthiaume Building or ask for directions to 10th
              floor &middot; room 1045.
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
  );
}
