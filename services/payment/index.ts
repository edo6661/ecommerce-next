import { db } from "@/lib/database";

export const getPayment = () => {
  try {
    return db.payment.findMany();
  } catch (err) {
    console.error(err);
    throw new Error("Internal Error");
  }
};
