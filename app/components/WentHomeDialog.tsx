import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Dispatch, SetStateAction } from "react";

interface WHDCProps {
  wentHomeDialog: boolean;
  setWentHomeDialog: Dispatch<SetStateAction<boolean>>;
}

export default function wentHomeDialogComponent({
  wentHomeDialog,
  setWentHomeDialog,
}: WHDCProps) {
  return (
    <Dialog
      open={wentHomeDialog}
      onClose={() => setWentHomeDialog(false)}
      slotProps={{
        paper: {
          sx: {
            width: "80vw",
            maxWidth: "80vw",
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
        <Button
          onClick={() => {
            setWentHomeDialog(false);
          }}
          color="primary"
          variant="contained"
        >
          WooHoo!!
        </Button>
      </DialogActions>
    </Dialog>
  );
}
