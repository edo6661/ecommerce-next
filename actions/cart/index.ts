"use server";
import {
  addToCart,
  removeFromCart,
  removeMultipleFromCart,
  updateQuantity,
} from "@/services/cart";
import { revalidatePath } from "next/cache";

export const onAddToCart = async (productId: string, quantity: number) => {
  try {
    const cart = await addToCart(productId, quantity);
    revalidatePath("/cart");
    revalidatePath("/");
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
    revalidatePath("/");
    return cart;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Error");
  }
};
export const onMultipleRemoveFromCart = async (ids: string[]) => {
  try {
    const cart = await removeMultipleFromCart(ids);
    revalidatePath("/cart");
    revalidatePath("/");
    return cart;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Error");
  }
};

export const onUpdateQuantity = async (id: string, quantity: number) => {
  try {
    await updateQuantity(id, quantity);
    revalidatePath("/cart");
    revalidatePath("/");
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong");
  }
};
