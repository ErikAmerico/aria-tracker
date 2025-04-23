"use client";
import { useEffect, useState } from "react";

export function useSimpleVersionCheck() {
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  useEffect(() => {
    const checkForUpdate = async () => {
      try {
        const res = await fetch("/", { method: "HEAD", cache: "no-store" });
        const newETag = res.headers.get("etag");
        const previousETag = sessionStorage.getItem("etag");

        if (previousETag && newETag && previousETag !== newETag) {
          setShowUpdateDialog(true);
          setTimeout(() => window.location.reload(), 2500);
        }

        if (newETag) {
          sessionStorage.setItem("etag", newETag);
        }
      } catch (err) {
        console.error("Version check failed:", err);
      }
    };

    if (!sessionStorage.getItem("etag")) {
      sessionStorage.setItem("etag", "blahblahblah");
      checkForUpdate();
    }

    window.addEventListener("focus", checkForUpdate);
    window.addEventListener("pageshow", checkForUpdate);

    return () => {
      window.removeEventListener("focus", checkForUpdate);
      window.removeEventListener("pageshow", checkForUpdate);
    };
  }, []);

  return { showUpdateDialog };
}
