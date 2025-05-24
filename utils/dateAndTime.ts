export function getLocalDateString(): string {
  const today = new Date();
  return (
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0")
  );
}

export function getSlotMinTime(viewDate: Date): string {
  const now = new Date();
  const isToday = now.toDateString() === viewDate.toDateString();

  if (isToday) {
    const hours = now.getHours().toString().padStart(2, "0");
    return `${hours}:00:00`; // rounded down to the hour
  }

  return "00:00:00"; // full day for other dates
}
