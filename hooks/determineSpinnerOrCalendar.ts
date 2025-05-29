import { useEffect, useLayoutEffect, useState } from "react";
import { getOrCreateClientId } from "@/utils/clientId";

export default function DetermineSpinnerOrCalendar(staticVersion: boolean) {
  const [clientId, setClientId] = useState<string>();
  const [showSpinner, setShowSpinner] = useState(false);
  const [readyToRenderCalendar, setReadyToRenderCalendar] = useState(false);
  const [isDOMReady, setIsDOMReady] = useState(false);

  useLayoutEffect(() => {
    // Wait until DOM is ready before showing the calendar with fade effect.
    // The Calendar was rendering for split second when the component mounted,
    // then dispearing and the fade in effect would happen.
    setIsDOMReady(true);
  }, []);

  useEffect(() => {
    if (!staticVersion) {
      setClientId(getOrCreateClientId());
      // If clientId isn't ready after 0.5s, show spinner
      const timeout = setTimeout(() => setShowSpinner(true), 500);
      return () => clearTimeout(timeout);
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

  return {
    clientId,
    showSpinner,
    readyToRenderCalendar,
    isDOMReady,
  };
}
