import { db } from "@/lib/database";
import { unstable_noStore } from "next/cache";

export const getCategory = async () => {
  // unstable_noStore();
  return db.category.findMany({}).catch((err) => {
    console.error(err);
    throw new Error("failed to fetch category");
  });
};
