import { onRemoveFromCart } from "@/actions/cart";
import { Button } from "@/components/ui/button";
import { getCartByUserId } from "@/services/cart";
import { getUserByExternalId, getUserById } from "@/services/user";
import { currentUser } from "@clerk/nextjs";
import React from "react";
import ProductsCard from "../_components/products/ProductsCard";
import ProductsCart from "./_components/ProductsCart";
import Title from "@/components/shared/Title";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import TotalPriceAction from "./_components/TotalPriceAction";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import WrapperProductsCard from "./_components/WrapperProductsCard";

const page = async () => {
  const self = await currentUser();
  const user = await getUserByExternalId(self?.id!);
  const cart = await getCartByUserId(user?.id!);

  const cartExist = cart.length > 0;

  return (
    <>
      <section className="container py-4">
        <Title label="Cart" />
        <div className=" sm:grid sm:grid-cols-3 gap-4 flex flex-col ">
          <div
            className={`sm:col-span-2 cartContainer ${
              cartExist ? "block" : "hidden"
            } `}
          >
            <div className="fl-center justify-between ">
              <div className="fl-center gap-4">
                <Checkbox />
                <p className="font-semibold">
                  Select all
                  <span className="focusedWord pl-1">( {cart.length} )</span>
                </p>
              </div>
              <Button variant="link" className="hoveredText">
                Delete
              </Button>
            </div>
            <Separator className=" mb-4" />
            <div className="space-y-6">
              {cartExist && <WrapperProductsCard cart={cart} />}
            </div>
          </div>
          {!cartExist && (
            <div className=" cartContainer fl-col-center sm:col-span-2">
              <div className="sm:fl-center sm:gap-4 sm:h-48">
                <Image
                  width={160}
                  height={160}
                  alt="Mugi Empty Cart"
                  src="/mugi-sad.gif"
                  className="rounded-xl sm:mx-1 mx-auto "
                />
                <div>
                  <Title label="Your shopping cart is empty" />
                  <p className="pb-2">
                    Come on, fill it with your dream items!
                  </p>
                  <div className="fl-col-center sm:block">
                    <Button>Start shopping</Button>
                    {/* <Link href="/" className="hoveredText">
                      Start shopping
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="cartContainer">
            <Title label="Shopping summary" />
            <TotalPriceAction />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
