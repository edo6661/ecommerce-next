"use client";
import Title from "@/components/shared/Title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useMemo, useState, useTransition } from "react";
import { FaHeart, FaRegHeart, FaShare, FaShoppingCart } from "react-icons/fa";
import { CiMoneyBill } from "react-icons/ci";
import { onAddToCart } from "@/actions/cart";
import { toast } from "sonner";
import { dev } from "@/helpers/initial";
import { useRouter } from "next/navigation";

const FormBuyProduct = ({
  quantity,
  price,
  id,
  userId,
  existingProductInCart,
}: {
  quantity: number;
  price: number;
  id: string;
  userId: string;
  existingProductInCart: boolean;
}) => {
  const [qty, setQty] = useState(1);
  const [total, setTotal] = useState(price);
  const [isPending, startTransition] = useTransition();

  const handleQty = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQty(+e.target.value);

  const subTotal = useMemo(() => {
    setTotal(qty * price);
    return total;
  }, [qty, price, total]);

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

  return (
    <div className="borderShadowNeutral">
      <Title label="Set amounts " />
      <div className=" space-y-2">
        <div className="fl-center gap-2">
          <Input
            placeholder="Qty"
            type="number"
            className=" w-16"
            min={1}
            max={quantity}
            onChange={handleQty}
            value={qty}
          />
          <p>
            Total Stock: <span>{quantity}</span>
          </p>
        </div>
        <div className="fl-center gap-2">
          <p>
            Sub total:{" "}
            <span className="text-red-200 font-semibold">Rp {subTotal}</span>
          </p>
        </div>
      </div>
      <div className="fl-center flex-wrap text-lg pt-2">
        <Button
          className="flex-1 rounded-none rounded-l-xl fl-center gap-1"
          onClick={() => handleSubmit()}
          disabled={isPending}
        >
          <span>
            <FaShoppingCart />
          </span>
          <span>Cart</span>
        </Button>
        <Button
          className="flex-1 rounded-none rounded-r-xl fl-center gap-1"
          variant="secondary"
        >
          <span>
            <CiMoneyBill />
          </span>
          <span>Buy</span>
        </Button>
      </div>
      <div className="fl-center flex-wrap text-lg">
        <Button
          className="flex-1 rounded-none rounded-l-xl fl-center gap-1"
          variant="secondary"
        >
          <span>
            <FaHeart />
            {/* <FaRegHeart /> */}
          </span>
          <span>Wishlist</span>
        </Button>
        <Button className="flex-1 rounded-none rounded-r-xl fl-center gap-1">
          <span>
            <FaShare />
          </span>
          <span>Share</span>
        </Button>
      </div>
    </div>
  );
};

export default FormBuyProduct;
