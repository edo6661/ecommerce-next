"use client";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { dev } from "@/helpers/initial";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  isFollowing: boolean;
  userId: string;
}

const FollowActions = ({ isFollowing, userId }: Props) => {
  const conditionalsFollow = isFollowing ? " Unfollow" : "Follow";

  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => {
          if (data) {
            toast.success(`You are now following ${data.following.username}`);
          } else {
            toast.error(dev);
          }
        })
        .catch(() => toast.error(dev));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => {
          if (data) {
            toast.success(`You are now unfollow ${data.following.username}`);
          } else {
            toast.error(dev);
          }
        })
        .catch(() => toast.error(dev));
    });
  };

  const handleClick = () => {
    isFollowing ? handleUnfollow() : handleFollow();
  };

  return (
    <Button disabled={isPending} onClick={handleClick}>
      {conditionalsFollow}
    </Button>
  );
};

export default FollowActions;
