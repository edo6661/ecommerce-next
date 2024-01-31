"use client";
import Title from "@/components/shared/Title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useMemo, useState } from "react";
import { FaHeart, FaRegHeart, FaShare, FaShoppingCart } from "react-icons/fa";
import { CiMoneyBill } from "react-icons/ci";

const FormBuyProduct = ({
  quantity,
  price,
}: {
  quantity: number;
  price: number;
}) => {
  const [qty, setQty] = useState(1);
  const [total, setTotal] = useState(price);

  const handleQty = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQty(+e.target.value);

  const subTotal = useMemo(() => {
    setTotal(qty * price);
    return total;
  }, [qty, price, total]);

  const handleSubmit = () => {
    const data = {
      qty,
      total,
    };
    console.log(data);
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
        <Button className="flex-1 rounded-none rounded-l-xl fl-center gap-1">
          <span>
            <FaShoppingCart />
          </span>
          <span>Cart</span>
        </Button>
        <Button
          className="flex-1 rounded-none rounded-r-xl fl-center gap-1"
          variant="secondary"
          onClick={handleSubmit}
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
