"use client";
// import { useEffect, useState } from "react";
import { useEffect } from "react";

export function useVersionChecker(version: string) {
  // const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    const checkVersion = () => {
      const storedVersion = localStorage.getItem("versionNumber");
      const hasSeenInfoDialog = localStorage.getItem("hasSeenInfoDialog");

      if (!storedVersion && !hasSeenInfoDialog) {
        console.log(
          "No version found. and has not seen dialog - likely new user. Setting version"
        );
        localStorage.setItem("versionNumber", version);
      } else if (!storedVersion && hasSeenInfoDialog) {
        console.log(
          "No version found. but has seen dialog - likely existing user, just hasn't seen the version update. Setting version and refreshing..."
        );
        localStorage.setItem("versionNumber", version);
        // setShouldReload(true);
        window.location.reload();
      } else if (storedVersion !== version) {
        console.log("Version mismatch detected. Updating...");
        localStorage.setItem("versionNumber", version);
        // setShouldReload(true);
        window.location.reload();
      }
    };

    checkVersion();

    const interval = setInterval(checkVersion, 5000);

    return () => clearInterval(interval);
  }, [version]);

  // useEffect(() => {
  //   if (shouldReload) {
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 3000);
  //   }
  // }, [shouldReload]);

  // return { shouldReload };
}
