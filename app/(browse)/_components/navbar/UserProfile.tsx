"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";

const UserProfile = () => {
  return (
    <div className=" scale-125">
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
};

export default UserProfile;
