import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { pusher } from "../../../../lib/pusher-server";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const idParam = params.id;

    if (!idParam) {
      return NextResponse.json(
        { error: "Missing ID parameter" },
        { status: 400 }
      );
    }

    const id = Number.parseInt(idParam);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await prisma.timeBlock.delete({
      where: { id },
    });

    await pusher.trigger("aria-calendar", "delete-block", {
      id: id.toString(),
    });

    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.error("Error deleting timeblock:", error);
    return NextResponse.json(
      { error: "Failed to delete timeblock" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const idParam = params.id;

    if (!idParam) {
      return NextResponse.json(
        { error: "Missing ID parameter" },
        { status: 400 }
      );
    }

    const id = Number.parseInt(idParam);
    const body = await req.json();

    const updated = await prisma.timeBlock.update({
      where: { id },
      data: {
        name: body.title,
      },
    });

    await pusher.trigger("aria-calendar", "update-block", {
      id: updated.id,
      title: updated.name,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating timeblock:", error);
    return NextResponse.json(
      { error: "Failed to update timeblock" },
      { status: 500 }
    );
  }
}
