import Pride from "react-canvas-confetti/dist/presets/pride";
import { useRef, useEffect } from "react";

export default function Confetti() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Once the canvas is injected, find it and override its style
    const canvas = wrapperRef.current?.querySelector("canvas");
    if (canvas) {
      canvas.style.position = "absolute";
      canvas.style.inset = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    }
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "absolute",
        pointerEvents: "none",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      <Pride
        autorun={{ speed: 30 }}
        decorateOptions={(options) => ({
          ...options,
          colors: ["#4D88D4", "#ffffff", "#f48fb1"],
        })}
      />
    </div>
  );
}
