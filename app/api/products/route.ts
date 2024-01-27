import { db } from "@/lib/database";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: Request, res: Response) => {
  try {
    const { searchParams } = new URL(req.url!);

    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));

    const totalProducts = await db.product.count();

    const products = await db.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    const nextPage =
      totalProducts > (page - 1) * limit + products.length ? page + 1 : null;

    return NextResponse.json({ products, nextPage });
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};

export const POST = async (req: Request, res: Response) => {
  try {
    const data = await req.json();
    const product = await db.product.create({
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
