import { db } from "@/lib/database";

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
