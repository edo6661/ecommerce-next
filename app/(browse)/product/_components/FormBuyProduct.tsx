"use client";
import Title from "@/components/shared/Title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useMemo, useState, useTransition } from "react";
import {
  FaEdit,
  FaHeart,
  FaRegHeart,
  FaShare,
  FaShoppingCart,
} from "react-icons/fa";
import { CiMoneyBill } from "react-icons/ci";
import { onAddToCart } from "@/actions/cart";
import { toast } from "sonner";
import { dev } from "@/helpers/initial";
import { usePathname, useRouter } from "next/navigation";
import { upperFirst } from "@/helpers";

const FormBuyProduct = ({
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
  const [qty, setQty] = useState(1);
  const [total, setTotal] = useState(price);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

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
          toast.success(
            `successfully add ${upperFirst(product.product.name)} to cart `
          );
        })
        .catch((err) => {
          console.error(err);
          toast.error(dev);
        });
    });
  };

  const handleEdit = () => {
    router.push(`/product/${name}/edit`);
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
          disabled={isPending || isOwner}
        >
          <span>
            <FaShoppingCart />
          </span>
          <span>Cart</span>
        </Button>
        <Button
          className="flex-1 rounded-none rounded-r-xl fl-center gap-1"
          variant="secondary"
          disabled={isOwner}
        >
          <span>
            <CiMoneyBill />
          </span>
          <span>Mock</span>
        </Button>
      </div>
      <div className="fl-center flex-wrap text-lg">
        <Button
          className="flex-1 rounded-none rounded-l-xl fl-center gap-1"
          variant="secondary"
          disabled={isOwner}
        >
          <span>
            <FaHeart />
            {/* <FaRegHeart /> */}
          </span>
          Mock
        </Button>
        <Button
          className="flex-1 rounded-none rounded-r-xl fl-center gap-1"
          onClick={() => handleEdit()}
        >
          <span>
            <FaEdit />
          </span>
          <span>Edit</span>
        </Button>
      </div>
    </div>
  );
};

export default FormBuyProduct;
