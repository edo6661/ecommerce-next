import { db } from "@/lib/database";
import { getSelf } from "../user";

export const getCartByUserId = async (userId: string) => {
  try {
    const cart = await db.cart.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
    });

    return cart;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const addToCart = async (productId: string, quantity: number) => {
  try {
    const user = await getSelf();

    const cart = await db.cart.create({
      data: {
        productId,
        userId: user.id,
        quantity,
      },
      include: {
        product: true,
      },
    });
    return cart;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Error");
  }
};

export const removeFromCart = async (id: string) => {
  try {
    const cart = await db.cart.delete({
      where: {
        id,
      },
    });

    return cart;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Error");
  }
};
export const removeMultipleFromCart = async (ids: string[]) => {
  try {
    const { id: userId } = await getSelf();
    const deleteRequests = ids.map((productId) => {
      return db.cart.deleteMany({
        where: {
          productId,
          userId,
        },
      });
    });

    await Promise.all(deleteRequests);
  } catch (error) {
    console.error(error);
    throw new Error("Internal Error");
  }
};

export const updateQuantity = async (id: string, quantity: number) => {
  try {
    await db.cart.update({
      where: {
        id,
      },
      data: {
        quantity,
      },
      select: undefined,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Internal Error");
  }
};

export const getCartLength = async () => {
  try {
    const { id: userId } = await getSelf();
    const cart = await db.cart.count({
      where: {
        userId,
      },
    });
    return cart;
  } catch (err) {
    console.error(err);
    return [];
  }
};
