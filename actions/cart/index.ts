"use server";
import { addToCart, removeFromCart } from "@/services/cart";
import { revalidatePath } from "next/cache";

export const onAddToCart = async (productId: string, quantity: number) => {
  try {
    const cart = await addToCart(productId, quantity);
    revalidatePath("/cart");
    return cart;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Error");
  }
};

export const onRemoveFromCart = async (id: string) => {
  try {
    const cart = await removeFromCart(id);
    revalidatePath("/cart");
    return cart;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Error");
  }
};
