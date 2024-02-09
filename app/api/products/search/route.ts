import { db } from "@/lib/database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: Request, res: Response) => {
  try {
    const { searchParams } = new URL(req.url!);
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));
    const query = searchParams.get("query");

    const products = await db.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        OR: [
          {
            name: {
              contains: query!,
            },
          },
          {
            description: {
              contains: query!,
            },
          },
        ],
      },
    });

    const totalPages = Math.ceil(products.length / limit);

    return NextResponse.json({ products, totalPages });
  } catch (err) {
    console.error(err);
    throw new Error("Internal Error");
  }
};
