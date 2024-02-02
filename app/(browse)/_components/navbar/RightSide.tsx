import { ModeToggle } from "@/components/shared/theme";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { LogIn, PlusCircle, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { RxDividerVertical } from "react-icons/rx";
import ToggleNav from "./ToggleNav";

const RightSide = () => {
  return (
    <>
      <div className="fl-center gap-2 ">
        <div className="sm:fl-center sm:gap-4 gap-2 hidden">
          <Link href="/cart">
            <ShoppingCart className=" w-7 h-7" />
          </Link>
          <Link href="/add-product">
            <PlusCircle className=" w-7 h-7" />
          </Link>
        </div>
        <div className=" opacity-40 sm:block hidden">
          <RxDividerVertical size={40} />
        </div>
        <div className="fl-center gap-4">
          <div className="fl-center sm:gap-4 gap-2">
            <div className="sm:fl-center gap-4 hidden ">
              <ModeToggle />
              <div className=" scale-125">
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </div>
            <SignedOut>
              <Link href="/sign-in" className="sm:block hidden">
                <LogIn />
              </Link>
            </SignedOut>
            <span style={{ scale: 0.8 }} className=" block sm:hidden">
              <ModeToggle />
            </span>
            <ToggleNav />
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSide;
