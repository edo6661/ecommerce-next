"use server";
import { db } from "@/lib/database";
import { getSelf } from "@/services/user";
import { revalidatePath } from "next/cache";

export const getUserByUserId = (userId: string) => {
  try {
    const user = db.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (err) {
    console.error(err);
    throw new Error("Error getting user by userId");
  }
};

export const editAddress = async (address: string) => {
  try {
    const { id } = await getSelf();
    if (!id) throw new Error("Unauthorized");
    await db.user.update({
      data: {
        address,
      },
      where: {
        id,
      },
    });
    revalidatePath("/cart/shipment");
  } catch (error) {
    console.error(error);
    throw new Error("Error adding address to user");
  }
};
