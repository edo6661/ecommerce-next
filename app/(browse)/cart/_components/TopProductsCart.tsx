"use client";
import { onMultipleRemoveFromCart } from "@/actions/cart";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { dev } from "@/helpers/initial";
import useMugi from "@/hooks/useMugi";
import { Cart, Product } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useTransition } from "react";
import { toast } from "sonner";

const TopProductsCart = ({
  cart,
}: {
  cart: (Cart & { product: Product })[];
}) => {
  const [isPending, startTransition] = useTransition();
  const { handleCheckedAll, checked, checkedAll, step } = useMugi(
    (state) => state
  );
  const handleDelete = () => {
    // ! akan nge filter key value nya false, jadi value yang true aja yang diambil / bakal nge return key yang value nya true doang
    const productsIds = Object.keys(checked).filter((key) => checked[key]);
    if (!productsIds.length) {
      toast.error("Please select a product first");
      return;
    }
    startTransition(() => {
      onMultipleRemoveFromCart(productsIds)
        .then(() => {
          toast.success("Products has been removed from the cart");
        })
        .catch(() => {
          toast.error(dev);
        });
    });
  };

  return (
    <>
      <AnimatePresence initial={false}>
        {!step && (
          <>
            <motion.div className="fl-center justify-between ">
              <div className="fl-center gap-4">
                <Checkbox
                  onCheckedChange={handleCheckedAll}
                  checked={checkedAll}
                />
                <p className="font-semibold">
                  Select all
                  <span className="focusedWord pl-1">( {cart.length} )</span>
                </p>
              </div>
              <Button
                variant="link"
                className="hoveredText"
                onClick={handleDelete}
                disabled={isPending}
              >
                Delete
              </Button>
            </motion.div>
            <Separator className=" mb-4" />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default TopProductsCart;
