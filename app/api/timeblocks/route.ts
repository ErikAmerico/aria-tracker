import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { pusher } from "../../../lib/pusher-server";

export async function POST(req: Request) {
  const body = await req.json();
  const { title, start, end, clientId } = body;

  const timeBlock = await prisma.timeBlock.create({
    data: {
      name: title,
      startTime: new Date(start),
      endTime: new Date(end),
      date: new Date(start),
      clientId: clientId || "unknown",
    },
  });

  await pusher.trigger("aria-calendar", "new-block", {
    id: timeBlock.id.toString(),
    title: timeBlock.name,
    start: timeBlock.startTime,
    end: timeBlock.endTime,
    extendedProps: {
      clientId: timeBlock.clientId,
    },
  });
  return NextResponse.json(timeBlock);
}

export async function GET() {
  const blocks = await prisma.timeBlock.findMany();
  return NextResponse.json(blocks);
}
