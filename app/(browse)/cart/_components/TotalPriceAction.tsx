"use client";
import { Button } from "@/components/ui/button";
import useMugi from "@/hooks/useMugi";
import Link from "next/link";
import React from "react";

const TotalPriceAction = () => {
  const { totalPrice } = useMugi((state) => state);
  return (
    <>
      <div className="fl-center justify-between">
        <p className="focusedWord">Total</p>
        {totalPrice}
      </div>
      <Link href="/" className=" w-full">
        <Button className="sm:w-full mt-4">Buy</Button>
      </Link>
    </>
  );
};

export default TotalPriceAction;
