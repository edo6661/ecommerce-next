import { ModeToggle } from "@/components/shared/theme";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { LogIn, PlusCircle, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import { RxDividerVertical } from "react-icons/rx";
import ToggleNav from "./ToggleNav";
import { getCartLength } from "@/services/cart";
import { LiaJediOrder } from "react-icons/lia";
import ClerkButtonUser from "./ClerkButtonUser";

const RightSide = async ({ cartLength }: { cartLength: number }) => {
  return (
    <>
      <div className="fl-center gap-2 ">
        <div className="sm:fl-center sm:gap-4 gap-2 hidden">
          <Link href="/cart" className="relative">
            <ShoppingCart className=" w-7 h-7" />
            <SignedIn>
              <span className="absolute -top-3 text-white -right-4 bg-red-500 px-2 rounded-full">
                {cartLength}
              </span>
            </SignedIn>
          </Link>
          <Link href="/add-product">
            <PlusCircle className=" w-7 h-7" />
          </Link>
          <Link href="/orders">
            <LiaJediOrder size={28} />
          </Link>
        </div>
        <div className=" opacity-40 sm:block hidden">
          <RxDividerVertical size={40} />
        </div>
        <div className="fl-center gap-4">
          <div className="fl-center gap-4">
            <div className="sm:fl-center gap-4 hidden ">
              <ModeToggle />
              <div className=" scale-125" suppressHydrationWarning>
                <ClerkButtonUser />
              </div>
            </div>
            <SignedOut>
              <Link href="/sign-in" className="sm:block hidden">
                <LogIn />
              </Link>
            </SignedOut>
            {/* <span style={{ scale: 0.8 }} className=" block sm:hidden">
              <ModeToggle />
            </span> */}
            <Link href="/cart" className="relative sm:hidden block">
              <ShoppingCart className=" w-7 h-7" />
              <SignedIn>
                <span className="absolute -top-3 text-white -right-4 bg-red-500 px-2 rounded-full">
                  {cartLength}
                </span>
              </SignedIn>
            </Link>
            <ToggleNav />
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSide;
