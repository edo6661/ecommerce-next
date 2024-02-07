"use server";
import { addOrder } from "@/services/order";
import { getSelf } from "@/services/user";
import { Order } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const onAddOrder = async (body: Partial<Order>) => {
  try {
    const user = await getSelf();
    await addOrder({ body: { ...body, userId: user.id } });

    revalidatePath("/orders");
  } catch (err) {
    console.error(err);
    throw new Error("Internal Error");
  }
};
