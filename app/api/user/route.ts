import { db } from "@/lib/database";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url!);
    const ownerId = searchParams.get("ownerId");
    const user = await db.user.findUnique({
      where: {
        id: ownerId!,
      },
      select: {
        username: true,
      },
    });
    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    throw new Error("Internal Error");
  }
};
