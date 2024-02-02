"use client";

import { onRemoveFromCart } from "@/actions/cart";
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
import { useMemo, useState, useTransition } from "react";
import { dev } from "@/helpers/initial";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { productCardProps } from "@/utils/framer-motion";

const ProductsCart = ({
  id,
  productId,
  quantity,
  product,
}: Cart & { product: Product }) => {
  const [isPending, startTransition] = useTransition();
  const [qty, setQty] = useState(1);

  const handleQty = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQty(+e.target.value);

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

  const photo = product.photos.split(",")[0];

  return (
    <>
      <div className="flex flex-col gap-2">
        <p>{total}</p>
        <div className="flex gap-4 ">
          <Checkbox />
          <AnimatePresence>
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
            <div className="flex justify-between ">
              <p>{upperFirst(product.name)}</p>
              <p>Rp {product.price}</p>
            </div>
            <p className="focusedWord">Some Variant</p>
            <Separator />
            <div className=" self-end fl-center gap-2">
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
                min={1}
                max={product.quantity!}
                onChange={handleQty}
                value={qty}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsCart;
