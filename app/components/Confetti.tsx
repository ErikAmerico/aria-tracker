import Pride from "react-canvas-confetti/dist/presets/pride";

export default function Confetti() {
  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        zIndex: 9999,
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
