import { db } from "@/lib/database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const PATCH = async (req: Request, res: Response) => {
  try {
    const data = await req.json();
    console.log(data);
    // const product = await db.cart.update({
    //   where: {
    //     id,
    //   },
    //   data: {
    //     quantity,
    //   },
    // });
    // return NextResponse.json(product);
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong");
  }
};
