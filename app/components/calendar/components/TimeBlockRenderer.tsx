import { EventContentArg } from "@fullcalendar/core";

export default function RenderTimeBlock({ event }: EventContentArg) {
  const start = new Date(event.startStr);
  const end = new Date(event.endStr);
  const durationInMs = end.getTime() - start.getTime();
  const durationInHours = durationInMs / (1000 * 60 * 60);
  const isShort = durationInHours <= 1;

  return (
    <div
      style={{
        fontSize: isShort ? "0.7rem" : "0.9rem",
        padding: "2px 4px",
        whiteSpace: "normal",
        lineHeight: "1.2",
      }}
    >
      <div>
        {start.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}
        {" - "}
        {end.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}
        {" - "}
        {event.title}
      </div>
    </div>
  );
}
