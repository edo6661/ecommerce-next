"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const TotalPriceAction = () => {
  return (
    <>
      <div className="fl-center justify-between">
        <p className="focusedWord">Total</p>
        <p>Rp 450</p>
      </div>
      <Link href="/" className=" w-full">
        <Button className="sm:w-full mt-4">Buy</Button>
      </Link>
    </>
  );
};

export default TotalPriceAction;
