import { db } from "@/lib/database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: Request, res: Response) => {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name")!;

    const totalProducts = await db.product.count({
      where: {
        category: {
          name,
        },
      },
    });
    return NextResponse.json({ totalProducts });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
