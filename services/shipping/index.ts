"use server";
import { db } from "@/lib/database";

export const getShipping = () => {
  try {
    return db.shipping.findMany();
  } catch (err) {
    console.error(err);
    throw new Error("Internal Error");
  }
};
