"use server";
import { db } from "@/lib/database";
import { unstable_noStore } from "next/cache";

export const getCategory = async () => {
  return db.category.findMany({}).catch((err) => {
    console.error(err);
    throw new Error("failed to fetch category");
  });
};

export const getCategoryById = async (id: string) => {
  return db.category
    .findUnique({
      where: {
        id,
      },
      select: {
        name: true,
      },
    })
    .catch((err) => {
      console.error(err);
      throw new Error("failed to fetch category");
    });
};
