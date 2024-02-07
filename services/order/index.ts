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

export const getOrders = async (query: string, currentPage: number) => {
  try {
    const limit = 1;
    const offset = (currentPage - 1) * limit;
    const { id: userId } = await getSelf();
    const orders = await db.order.findMany({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                owner: true,
              },
            },
          },
        },
        user: true,
      },
      take: limit,
      skip: offset,
    });

    const ordersLength = await db.order.count({
      where: {
        userId,
      },
    });

    const totalPages = Math.ceil(ordersLength / limit);

    return { orders, totalPages };
  } catch (err) {
    console.error(err);
    throw new Error("Internal Error");
  }
};
