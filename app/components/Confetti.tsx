import { Fireworks } from "fireworks-js";
import { useRef, useEffect } from "react";

export default function Confetti() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const fireworks = new Fireworks(container, {
      autoresize: true,
      opacity: 0.5,
      acceleration: 1.05,
      friction: 0.97,
      gravity: 1.5,
      particles: 75,
      traceLength: 5,
      traceSpeed: 1,
      explosion: 5,
      intensity: 12,
      flickering: 50,
      lineStyle: "round",
      hue: { min: 200, max: 330 },
      delay: { min: 30, max: 60 },
      rocketsPoint: { min: 50, max: 50 },
      lineWidth: {
        explosion: { min: 1, max: 3 },
        trace: { min: 1, max: 2 },
      },
      brightness: { min: 100, max: 100 },
      decay: { min: 0.015, max: 0.03 },
      mouse: { click: false, move: false, max: 1 },
    });
    fireworks.start();

    return () => {
      fireworks.stop(true);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fire-works"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
