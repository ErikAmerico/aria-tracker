import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import "./header.css";

interface HeaderProps {
  howToDialog: boolean;
  setHowToDialog: Dispatch<SetStateAction<boolean>>;
  openDirectionsDialog: boolean;
  setOpenDirectionsDialog: Dispatch<SetStateAction<boolean>>;
}

export default function Header({
  howToDialog,
  setHowToDialog,
  openDirectionsDialog,
  setOpenDirectionsDialog,
}: HeaderProps) {
  return (
    <h1 className="text-xl font-semibold p-4 h1-container">
      <span className="title">Aria&apos;s Visitors</span>
      <IconButton
        onClick={() => setHowToDialog(true)}
        size="small"
        disabled={howToDialog}
      >
        <InfoOutlinedIcon fontSize="small" className="icon" />
      </IconButton>
      <br />
      <Button
        onClick={() => setOpenDirectionsDialog(true)}
        variant="contained"
        size="small"
        disabled={openDirectionsDialog}
        sx={{
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
  );
}
