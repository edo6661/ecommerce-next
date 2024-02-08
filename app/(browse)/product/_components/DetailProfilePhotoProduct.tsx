import { Button } from "@/components/ui/button";
import { isFollowingUser } from "@/services/follow";
import React from "react";
import { FaClock, FaStar } from "react-icons/fa";
import FollowActions from "../../[username]/_components/actions";
import { User } from "@prisma/client";

interface Props extends User {
  isOwner: boolean;
}

const DetailProfilePhotoProduct = async ({ id, isOwner }: Props) => {
  const isFollowing = await isFollowingUser(id!);

  return (
    <>
      <div className="md:text-sm lg:text-base text-base">
        <div className="fl-center gap-2 ">
          <span>
            <FaStar />
          </span>
          <p>
            <span className="text-muted-foreground">4.9 </span>
            Average Rating
          </p>
        </div>
        <div className="fl-center gap-2">
          <span>
            <FaClock />
          </span>
          <p>
            <span className="text-muted-foreground">4.8 </span>
            Order Process
          </p>
        </div>
      </div>
      {!isOwner && <FollowActions isFollowing={isFollowing} userId={id!} />}
    </>
  );
};

export default DetailProfilePhotoProduct;
