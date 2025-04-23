"use client";

import { useEffect } from "react";

export function useSimpleVersionCheck() {
  useEffect(() => {
    const checkVersion = async () => {
      try {
        const res = await fetch("/", {
          method: "HEAD",
          cache: "no-store",
        });

        const serverETag = res.headers.get("etag");

        const clientETag = sessionStorage.getItem("etag");

        if (clientETag && serverETag && clientETag !== serverETag) {
          // Force a reload to get the new version
          window.location.reload();
        } else {
          sessionStorage.setItem("etag", serverETag ?? "");
        }
      } catch (error) {
        console.error("Version check failed:", error);
      }
    };

    // Check on tab focus or navigation
    window.addEventListener("focus", checkVersion);
    window.addEventListener("pageshow", checkVersion);

    // Run once on initial load
    checkVersion();

    return () => {
      window.removeEventListener("focus", checkVersion);
      window.removeEventListener("pageshow", checkVersion);
    };
  }, []);
}
