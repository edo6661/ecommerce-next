"use client";

import { onRemoveFromCart, onUpdateQuantity } from "@/actions/cart";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useUserById from "@/hooks/useUserById";
import { Cart, Product, User } from "@prisma/client";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { upperFirst } from "@/helpers";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { FaHeart, FaTrash } from "react-icons/fa";
import { memo, useEffect, useMemo, useState, useTransition } from "react";
import { dev } from "@/helpers/initial";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { productCardProps } from "@/utils/framer-motion";
import { useDebouncedCallback } from "use-debounce";
import { onAddOrder } from "@/actions/order";
import useMugi from "@/hooks/useMugi";
import MockShipping from "./MockShipping";

interface Props extends Cart {
  product: Product;
}

const ProductsCart = ({ id, quantity, product }: Props) => {
  const { handleChecked, checked, step, setIsBuyPending } = useMugi(
    (state) => state
  );
  const [isPending, startTransition] = useTransition();
  const [qty, setQty] = useState(quantity ?? 1);

  const handleQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQty(+e.target.value);
    handleDebouncedQuantity(+e.target.value);
  };
  const handleDebouncedQuantity = useDebouncedCallback((num: number) => {
    startTransition(() => {
      onUpdateQuantity(id, num)
        .then(() => {
          return;
        })
        .catch(() => {
          toast.error(dev);
        });
    });
  }, 1000);

  const total = useMemo(() => {
    return product?.price! * qty;
  }, [product?.price, qty]);

  const handleDelete = (id: string) => {
    startTransition(() => {
      onRemoveFromCart(id)
        .then(() => {
          toast.success("Product removed from cart");
        })
        .catch(() => toast.error(dev));
    });
  };

  const exampleOrder = () => {
    const mockData = {};
    startTransition(() => {
      onAddOrder;
    });
  };

  useEffect(() => {
    setIsBuyPending(isPending);
  }, [isPending]);

  const photo = product.photos.split(",")[0];

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 ">
          <AnimatePresence initial={false}>
            {!step && (
              <motion.div>
                <Checkbox
                  onCheckedChange={() => handleChecked(product.id)}
                  checked={checked[product.id]}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence initial={false}>
            <motion.div
              variants={productCardProps}
              initial="initial"
              whileHover="animate"
              exit="exit"
              whileInView="view"
              viewport={{ once: true }}
            >
              <Link href={`/product/${encodeURI(product.name)}`}>
                <Image
                  src={photo}
                  alt={product.name}
                  width={80}
                  height={80}
                  className=" min-w-24 h-20 rounded-xl "
                />
              </Link>
            </motion.div>
          </AnimatePresence>
          <div className="flex flex-col w-full h-full">
            <AnimatePresence initial={false}>
              {!step && (
                <>
                  <motion.label htmlFor={`qty ${product.name}`}>
                    <div className="flex justify-between ">
                      <p>{upperFirst(product.name)}</p>
                      <p>Rp {product.price}</p>
                    </div>
                    <div className="flex justify-between focusedWord ">
                      <p>Some Variant</p>
                      <p>{total}</p>
                    </div>
                  </motion.label>
                  <Separator />
                </>
              )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {step && (
                <>
                  <motion.label htmlFor={`qty ${product.name}`}>
                    <div className="flex justify-between ">
                      <p>{upperFirst(product.name)}</p>
                      <p>
                        <span className="focusedWord">{qty}x</span> Rp{" "}
                        {product.price}
                      </p>
                    </div>
                    <div className="flex justify-between focusedWord ">
                      <p>Some Variant</p>
                      <p>{total}</p>
                    </div>
                  </motion.label>
                  <Separator />
                </>
              )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {!step && (
                <motion.div className=" self-end fl-center gap-2">
                  <Button variant="ghost" disabled={isPending}>
                    <FaHeart />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleDelete(id)}
                    disabled={isPending}
                  >
                    <FaTrash />
                  </Button>
                  <Input
                    placeholder="Qty"
                    type="number"
                    className=" w-20 rounded-md"
                    id={`qty ${product.name}`}
                    min={1}
                    max={product.quantity!}
                    onChange={handleQty}
                    value={qty}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsCart;
