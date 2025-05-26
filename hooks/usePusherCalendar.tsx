import { useEffect } from "react";
import { pusherClient } from "@/lib/pusher-client";
import { UPCPropsType } from "@/types";
import { CalendarEventType } from "@/types";

export function usePusherCalendar({ setEvents }: UPCPropsType) {
  useEffect(() => {
    pusherClient.subscribe("aria-calendar");

    // Pusher re-broadcasts to all clients — even the one that created the event.
    // when creating a new time block, the app might receive the "new-block" event again.
    // Without this check, it would append the same event twice.
    // I was getting duplicate entries on the calendar.
    const handler = (data: CalendarEventType) => {
      console.log("new-block event received:", data);
      setEvents((prev) => {
        const alreadyExists = prev.some((e) => e.id === data.id);
        if (alreadyExists) return prev;
        return [...prev, data];
      });
    };

    pusherClient.bind("new-block", handler);

    pusherClient.bind(
      "update-block",
      ({ id, title }: { id: string; title: string }) => {
        setEvents((prev) =>
          prev.map((event) =>
            event.id === String(id) ? { ...event, title } : event
          )
        );
      }
    );

    pusherClient.bind("delete-block", ({ id }: { id: string }) => {
      setEvents((prev) => prev.filter((event) => event.id !== id));
    });

    return () => {
      pusherClient.unbind("new-block", handler);
      pusherClient.unsubscribe("aria-calendar");
    };
  }, [setEvents]);
}
