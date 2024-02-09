"use client";
import Title from "@/components/shared/Title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useMemo, useState, useTransition } from "react";
import { RiChat4Line } from "react-icons/ri";
import { onAddToCart } from "@/actions/cart";
import { toast } from "sonner";
import { dev } from "@/helpers/initial";
import Link from "next/link";
import { MessageSquareText } from "lucide-react";

const FixedMobileCart = ({
  quantity,
  price,
  id,
  userId,
  existingProductInCart,
  isOwner,
  name,
}: {
  quantity: number;
  price: number;
  id: string;
  userId: string;
  existingProductInCart: boolean;
  isOwner: boolean;
  name: string;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (existingProductInCart) {
      return toast.error("Product already in cart");
    }
    if (!userId) {
      return toast.error("Please login first");
    }
    startTransition(() => {
      onAddToCart(id, quantity)
        .then((product) => {
          toast.success(`Successfully add to cart ${product.product.name}`);
        })
        .catch((err) => {
          console.error(err);
          toast.error(dev);
        });
    });
  };

  const iconMessage = (
    <div className="shadow-neutral-500 shadow-sm p-2 rounded-xl ">
      <RiChat4Line size={25} />
    </div>
  );

  return (
    <>
      <div className="fl-center gap-4 p-4 w-full">
        {iconMessage}
        {isOwner ? (
          <>
            <Link
              className="w-full flex-1 block"
              href={`/product/${name}/edit`}
            >
              <Button variant={"secondary"} className="w-full ">
                Edit
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Button
              className="w-full shadow-muted-foreground shadow-sm cursor-cell"
              variant="ghost"
            >
              Mock Buy
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              onClick={handleSubmit}
              disabled={isPending}
            >
              Cart
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default FixedMobileCart;
