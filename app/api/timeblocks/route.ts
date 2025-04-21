import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { title, start, end } = body;

  const timeBlock = await prisma.timeBlock.create({
    data: {
      name: title,
      startTime: new Date(start),
      endTime: new Date(end),
      date: new Date(start),
      clientId: body.clientId || "unknown",
    },
  });

  return NextResponse.json(timeBlock);
}

export async function GET() {
  const blocks = await prisma.timeBlock.findMany();
  return NextResponse.json(blocks);
}
