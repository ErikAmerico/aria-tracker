import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { WHDCPropsType } from "@/types";

export default function WentHomeDialogComponent({
  wentHomeDialog,
  setWentHomeDialog,
  setStaticVersion,
}: WHDCPropsType) {
  return (
    <Dialog
      open={wentHomeDialog}
      onClose={() => setWentHomeDialog(false)}
      slotProps={{
        paper: {
          sx: {
            width: "80vw",
            maxWidth: "600px",
            margin: 0,
            borderRadius: 3,
            height: "300px",
            maxHeight: "300px",
            minHeight: "300px",
          },
        },
      }}
    >
      <DialogContent>
        <Typography component="div">
          <div
            style={{
              textAlign: "center",
              marginTop: "100px",
            }}
          >
            Aria went home
            <FavoriteIcon
              sx={{
                color: "#f48fb1",
                fontSize: "1rem",
                verticalAlign: "middle",
              }}
            />
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
          <Button
            onClick={() => {
              setWentHomeDialog(false);
              setStaticVersion(false);
              localStorage.setItem("staticVersion", "false");
            }}
            color="success"
            variant="contained"
          >
            Live Calendar
          </Button>

          <Button
            onClick={() => {
              setWentHomeDialog(false);
            }}
            color="primary"
            variant="contained"
          >
            WooHoo!!
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
