"use client";
import { useEffect, useState } from "react";
import CalendarView from "./components/Calendar";
import StaticCalendarView from "./components/StaticCalendar";
import Confetti from "./components/Confetti";
import Header from "./components/header/Header";
import WentHomeDialogComponent from "./components/WentHomeDialog";
import HowToDialogComponent from "./components/HowToDialog";
import DirectionDialogComponent from "./components/DirectionsDialog";

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

      <HowToDialogComponent
        howToDialog={howToDialog}
        setHowToDialog={setHowToDialog}
        staticVersion={staticVersion}
        setStaticVersion={setStaticVersion}
      />

      <DirectionDialogComponent
        openDirectionsDialog={openDirectionsDialog}
        setOpenDirectionsDialog={setOpenDirectionsDialog}
      />

      {staticVersion && <Confetti />}
    </main>
  );
}
