"use client";
import { useEffect, useState, useLayoutEffect } from "react";
import CalendarView from "./components/calendar/Calendar";
import StaticCalendarView from "./components/StaticCalendar";
import Confetti from "./components/Confetti";
import Header from "./components/header/Header";
import WentHomeDialogComponent from "./components/WentHomeDialog";
import HowToDialogComponent from "./components/HowToDialog";
import DirectionDialogComponent from "./components/DirectionsDialog";
import { getOrCreateClientId } from "@/utils/clientId";
import CircularProgress from "@mui/material/CircularProgress";
import FadeInWrapper from "./components/calendar/components/FadeInWrapper";

export default function Home() {
  const [howToDialog, setHowToDialog] = useState(false);
  const [openDirectionsDialog, setOpenDirectionsDialog] = useState(false);
  const [wentHomeDialog, setWentHomeDialog] = useState(false);
  //if we wanted to permenantly switch to the live calendar version
  //make staticVersion false and comment out the 'celebration' and 'live calendar' buttons
  //in components/HowToDialog.tsx
  const [staticVersion, setStaticVersion] = useState(true);
  const [clientId, setClientId] = useState<string>();
  const [showSpinner, setShowSpinner] = useState(false);
  const [readyToRenderCalendar, setReadyToRenderCalendar] = useState(false);
  const [isDOMReady, setIsDOMReady] = useState(false);

  useEffect(() => {
    const storedVersion = localStorage.getItem("staticVersion");
    if (storedVersion && storedVersion === "false") {
      setStaticVersion(false);
    }
  }, []);

  useLayoutEffect(() => {
    // Wait until DOM is ready before showing the calendar with fade effect.
    // The Calendar was rendering for split second when the component mounted,
    // then dispearing and the fade in effect would happen.
    setIsDOMReady(true);
  }, []);

  useEffect(() => {
    if (!staticVersion) {
      const seenDialog = localStorage.getItem("hasSeenInfoDialog");
      setClientId(getOrCreateClientId());
      if (!seenDialog) {
        setHowToDialog(true);
        localStorage.setItem("hasSeenInfoDialog", "true");
      }
      // If clientId isn't ready after 0.5s, show spinner
      const timeout = setTimeout(() => setShowSpinner(true), 500);
      return () => clearTimeout(timeout);
    } else {
      setWentHomeDialog(true);
    }
  }, [staticVersion]);

  // If spinner is showing and clientId arrives, wait to render calendar by 1s
  // So the UI doesn't look glitchy
  useEffect(() => {
    if (showSpinner && clientId) {
      const timeout = setTimeout(() => {
        setReadyToRenderCalendar(true);
      }, 1000);
      return () => clearTimeout(timeout);
    }

    if (!showSpinner && clientId) {
      // clientId arrived fast, skip spinner
      setReadyToRenderCalendar(true);
    }
  }, [showSpinner, clientId]);

  return (
    <main>
      <Header
        howToDialog={howToDialog}
        setHowToDialog={setHowToDialog}
        openDirectionsDialog={openDirectionsDialog}
        setOpenDirectionsDialog={setOpenDirectionsDialog}
      />

      {staticVersion && (
        <>
          {isDOMReady && (
            <FadeInWrapper>
              <StaticCalendarView />
              <WentHomeDialogComponent
                wentHomeDialog={wentHomeDialog}
                setWentHomeDialog={setWentHomeDialog}
              />
            </FadeInWrapper>
          )}
          <Confetti />
        </>
      )}

      {!staticVersion && (
        <>
          {readyToRenderCalendar && isDOMReady ? (
            <FadeInWrapper>
              <CalendarView clientId={clientId!} />
            </FadeInWrapper>
          ) : showSpinner ? (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <CircularProgress />
              <p>Looking for your ID number...</p>
            </div>
          ) : null}
        </>
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
    </main>
  );
}
