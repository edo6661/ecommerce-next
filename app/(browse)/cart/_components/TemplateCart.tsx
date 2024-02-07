import Title from "@/components/shared/Title";
import React from "react";
import WrapperProductsCard from "./WrapperProductsCard";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TotalPriceAction from "./TotalPriceAction";
import { Cart, Payment, Product, Shipping, User } from "@prisma/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  cart: (Cart & { product: Product })[];
  cartExist: boolean;
  label: string;
  user: User;
  payment: Payment[];
  shipping: Shipping[];
}

// TODO CHECK YANG KURANG

const TemplateCart = async ({
  cart,
  cartExist,
  label,
  user,
  shipping,
  payment,
}: Props) => {
  return (
    <section className="container py-4 ">
      <Title label={label} />
      <div className=" sm:grid sm:grid-cols-3 gap-4 flex flex-col relative">
        <div
          className={`sm:col-span-2 cartContainer relative ${
            cartExist ? "block" : "hidden"
          } `}
        >
          {cartExist && <WrapperProductsCard cart={cart} user={user} />}
        </div>
        {!cartExist && (
          <div
            className={cn("cartContainer fl-col-center sm:col-span-2", {
              "sm:col-span-3": !cartExist,
            })}
          >
            <div
              className={cn("sm:fl-center sm:gap-4 sm:h-48", {
                "sm:gap-8": !cartExist,
              })}
            >
              <Image
                width={210}
                height={160}
                alt="Mugi Empty Cart"
                src="/mugi-sad.gif"
                className="rounded-xl sm:mx-1 mx-auto "
              />
              <div>
                <Title label="Your shopping cart is empty" />
                <p className="pb-2">Come on, fill it with your dream items!</p>
                <div className="fl-col-center sm:block">
                  <Link href="/">
                    <Button>Start shopping</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        {cart.length > 0 && (
          <div className="cartContainer sm:static fixed bottom-0 left-0 w-full ">
            <Title label="Shopping summary" className="sm:block hidden" />
            <TotalPriceAction
              cart={cart}
              payment={payment}
              shipping={shipping}
              user={user}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default TemplateCart;
