"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
const ClerkButtonUser = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  });
  return (
    <>
      {isClient ? (
        <SignedIn>
          <UserButton />
        </SignedIn>
      ) : (
        <Skeleton className=" sm:w-10 sm:h-10 w-8 h-8 rounded-full" />
      )}
    </>
  );
};

export default ClerkButtonUser;
