"use server";
import { db } from "@/lib/database";

export const getBrand = async () => {
  return db.brand.findMany({}).catch((err) => {
    console.error(err);
    throw new Error("failed to fetch category");
  });
};
