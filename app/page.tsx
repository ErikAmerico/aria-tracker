"use client";
import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import HowToDialogComponent from "./components/HowToDialog";
import DirectionDialogComponent from "./components/DirectionsDialog";
import CalendarOrStaticCalendar from "./components/calendar/RenderCalendarOrStaticCalendar";
import DetermineSpinnerOrCalendar from "@/hooks/determineSpinnerOrCalendar";

export default function Home() {
  const [howToDialog, setHowToDialog] = useState(false);
  const [openDirectionsDialog, setOpenDirectionsDialog] = useState(false);
  const [wentHomeDialog, setWentHomeDialog] = useState(false);
  const [staticVersion, setStaticVersion] = useState(true);
  const { clientId, showSpinner, readyToRenderCalendar, isDOMReady } =
    DetermineSpinnerOrCalendar(staticVersion);

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
        localStorage.setItem("hasSeenInfoDialog", "true");
      }
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

      <CalendarOrStaticCalendar
        clientId={clientId}
        showSpinner={showSpinner}
        readyToRenderCalendar={readyToRenderCalendar}
        isDOMReady={isDOMReady}
        staticVersion={staticVersion}
        wentHomeDialog={wentHomeDialog}
        setWentHomeDialog={setWentHomeDialog}
      />

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
    </main>
  );
}
