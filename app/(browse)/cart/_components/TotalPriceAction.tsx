"use client";
import { Button } from "@/components/ui/button";
import useMugi from "@/hooks/useMugi";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";
import MockShipping from "./MockShipping";
import { Skeleton } from "@/components/ui/skeleton";
import MockPayment from "./MockPayment";
import { Cart, Payment, Product, Shipping } from "@prisma/client";
import { onAddOrder } from "@/actions/order";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  shipping: Shipping[];
  payment: Payment[];
  cart: (Cart & { product: Product })[];
}

const TotalPriceAction = ({ shipping, payment, cart }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { totalPrice, setStep, step, checked, isBuyPending } = useMugi(
    (state) => state
  );

  const [ship, setShip] = useState("");
  const [pay, setPay] = useState("");

  const handleStep = () => setStep(step ? 0 : 1);
  const handleClick = () => (step ? handlePayment() : handleStep());
  const handlePayment = () => {
    const ids = Object.keys(checked).filter((key) => checked[key]);

    const items = cart
      .filter((product) => ids.includes(product.productId))
      .map((pro) => ({
        productId: pro.productId,
        quantity: pro.quantity,
      }));

    const data = {
      total: totalPrice,
      shippingId: ship,
      paymentId: pay,
      items: {
        create: items,
      },
    };

    startTransition(() =>
      onAddOrder({ ...data })
        .then(() => {
          toast.success("Order Success");
          router.push("/orders");
        })
        .catch((err) => console.error(err))
    );
  };

  const isChecked = Object.values(checked).some((value) => value === true);

  const optionalPending = step
    ? isPending || ship === "" || pay === ""
    : !isChecked;

  return (
    <>
      <div className="fl-center justify-between">
        <p className="focusedWord">Total</p>
        <span>
          {isBuyPending ? <Skeleton className=" w-12 h-6" /> : totalPrice}
        </span>
      </div>
      {step > 0 && <MockShipping setShip={setShip} shipping={shipping} />}
      {step > 0 && <MockPayment setPay={setPay} payment={payment} />}
      <Button
        className="sm:w-full mt-4"
        onClick={handleClick}
        disabled={optionalPending}
      >
        {step ? "Submit" : "Buy"}
      </Button>
    </>
  );
};

export default TotalPriceAction;
