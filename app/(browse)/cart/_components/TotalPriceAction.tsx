"use client";
import { Button } from "@/components/ui/button";
import useMugi from "@/hooks/useMugi";
import React, { useState, useTransition } from "react";
import MockShipping from "./MockShipping";
import { Skeleton } from "@/components/ui/skeleton";
import MockPayment from "./MockPayment";
import { Cart, Payment, Product, Shipping, User } from "@prisma/client";
import { FaShippingFast } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import Modal from "@/components/shared/Modal";
import { onAddOrder } from "@/actions/order";
import { onMultipleRemoveFromCart } from "@/actions/cart";
import { cn } from "@/lib/utils";

interface Props {
  shipping: Shipping[];
  payment: Payment[];
  cart: (Cart & { product: Product })[];
  user: User;
}

const TotalPriceAction = ({ shipping, payment, cart, user }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    totalPrice,
    setStep,
    step,
    checked,
    isBuyPending,
    checkedAll,
    handleCheckedAll,
  } = useMugi((state) => state);

  const [ship, setShip] = useState("");
  const [pay, setPay] = useState("");
  const [isShipPay, setIsShipPay] = useState(false);

  const handleStep = () => setStep(step ? 0 : 1);
  const handleClick = () => (step ? handlePayment() : handleStep());
  const handlePayment = () => {
    if (!user.address) {
      toast.error("Please fill your address first");
    }
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
        })
        .catch((err) => console.error(err))
    );
    startTransition(() =>
      onMultipleRemoveFromCart(ids).then(() => {
        router.push("/orders");
      })
    );
  };

  const handleShipPay = () => {
    if (emptySelect) {
      return toast.error("Please select shipping and payment method");
    }
    setIsShipPay((prev) => !prev);
  };

  const emptySelect = ship === "" || pay === "";

  const isChecked = Object.values(checked).some((value) => value === true);

  const optionalPending = step
    ? isPending || emptySelect || !user.address
    : !isChecked;

  const btnMobile = (
    <Button
      className={cn("mt-4 sm:hidden block", {
        "w-full mx-8": step,
      })}
      onClick={handleClick}
      disabled={optionalPending}
    >
      {step ? "Submit" : "Buy"}
    </Button>
  );

  return (
    <>
      <div className={cn("fl-center justify-between")}>
        {!step && (
          <div className="fl-center gap-2 sm:hidden">
            <Checkbox
              onCheckedChange={handleCheckedAll}
              checked={checkedAll}
              id="all"
            />
            <label htmlFor="all">All</label>
          </div>
        )}
        <p className="focusedWord sm:block hidden">Total</p>

        <span className="sm:block hidden">
          {isBuyPending ? <Skeleton className=" w-12 h-6" /> : totalPrice}
        </span>
        <div
          className={cn("fl-center gap-4 sm:hidden", {
            "w-full": step,
          })}
        >
          <div
            className={cn("flex flex-col", {
              hidden: step,
            })}
          >
            <p className="focusedWord">Total</p>
            <span className="sm:hidden block">
              {isBuyPending ? <Skeleton className=" w-12 h-6" /> : totalPrice}
            </span>
          </div>
          {!step ? (
            btnMobile
          ) : !isShipPay ? (
            <Modal
              label="Payment & Shipping"
              icon={<FaShippingFast size={30} />}
              cancel="Cancel"
              action="Action"
              button={<Button onClick={handleShipPay}>Done</Button>}
            >
              {step > 0 && (
                <MockShipping setShip={setShip} shipping={shipping} />
              )}
              {step > 0 && <MockPayment setPay={setPay} payment={payment} />}
            </Modal>
          ) : (
            btnMobile
          )}
        </div>
      </div>
      <div className="hidden sm:block">
        {step > 0 && <MockShipping setShip={setShip} shipping={shipping} />}
        {step > 0 && <MockPayment setPay={setPay} payment={payment} />}
      </div>
      <Button
        className="sm:w-full mt-4 sm:block hidden"
        onClick={handleClick}
        disabled={optionalPending}
      >
        {step ? "Submit" : "Buy"}
      </Button>
    </>
  );
};

export default TotalPriceAction;
