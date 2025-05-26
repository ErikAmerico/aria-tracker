import { TimeBlockType, CalendarEventType } from "@/types";

export async function getTimeBlocks(): Promise<CalendarEventType[]> {
  const res = await fetch("/api/timeblocks");
  const data: TimeBlockType[] = await res.json();

  return data.map((block) => ({
    id: String(block.id),
    title: block.name,
    start: block.startTime,
    end: block.endTime,
    extendedProps: { clientId: block.clientId },
  }));
}

export async function addTimeBlock(
  title: string,
  start: string,
  end: string,
  clientId: string
) {
  return fetch("/api/timeblocks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, start, end, clientId }),
  });
}

export async function updateTimeBlock(id: string, title: string) {
  return fetch(`/api/timeblocks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
}

export async function deleteTimeBlock(id: string) {
  return fetch(`/api/timeblocks/${id}`, {
    method: "DELETE",
  });
}
