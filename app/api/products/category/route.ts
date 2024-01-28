import { db } from "@/lib/database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: Request, res: Response) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));
    const name = searchParams.get("name")!;

    const totalProducts = await db.product.count({
      where: {
        category: {
          name,
        },
      },
    });

    const products = await db.product.findMany({
      where: {
        category: {
          name,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // ! Jika totalProducts lebih besar dari jumlah total produk yang telah ditampilkan
    const nextPage =
      totalProducts > (page - 1) * limit + products.length ? page + 1 : null;

    return NextResponse.json({ products, nextPage });
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};
