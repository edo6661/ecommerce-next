import { db } from "@/lib/database";
import { getSelf } from "../user";

export const addOrder = async ({ body }: { body: any }) => {
  try {
    await db.order.create({
      data: {
        ...body,
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Internal Error");
  }
};

export const getOrders = async () => {
  try {
    const { id: userId } = await getSelf();
    const orders = await db.order.findMany({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });

    return orders;
  } catch (err) {
    console.error(err);
    return [];
  }
};
