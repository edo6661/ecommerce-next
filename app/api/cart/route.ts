import { db } from "@/lib/database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (req: Request, res: Response) => {
  try {
    const data = await req.json();
    const product = await db.cart.create({
      data: {
        ...data,
      },
    });
    return NextResponse.json(product);
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong");
  }
};
