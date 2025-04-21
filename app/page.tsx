"use client";
import dynamic from "next/dynamic";

const CalendarView = dynamic(() => import("./components/Calendar"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <h1
        className="text-xl font-semibold p-4"
        style={{ textAlign: "center", borderBottom: "1px solid black" }}
      >
        Aria&apos;s Visitors
      </h1>
      <CalendarView />
    </main>
  );
}
