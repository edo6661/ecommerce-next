/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Cart, Product, User } from "@prisma/client";
import ProductsCart from "./ProductsCart";
import { useEffect, useMemo } from "react";
import useMugi from "@/hooks/useMugi";
import TopProductsCart from "./TopProductsCart";
import CartAddress from "./CartAddress";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const WrapperProductsCard = ({
  cart,
  user,
}: {
  cart: (Cart & { product: Product })[];
  user: User;
}) => {
  const pathname = usePathname();
  const { setTotalPrice, step, checked, setChecked, setCheckedAll, setStep } =
    useMugi((state) => state);

  const initialKey = cart.reduce(
    (obj, product) => ({
      ...obj,
      [product.productId]: false,
    }),
    {}
  );

  const totalPrice = useMemo(() => {
    return cart
      .filter((product) => checked[product.productId])
      .reduce(
        (sum, product) => sum + product?.product?.price! * product.quantity,
        0
      );
  }, [cart, checked]);

  useEffect(() => {
    setChecked(initialKey);
  }, []);

  useEffect(() => {
    const allChecked = Object.values(checked).every((value) => value === true);
    if (allChecked) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [checked]);

  useEffect(() => {
    setTotalPrice(totalPrice);
  }, [totalPrice]);

  useEffect(() => {
    setStep(0);
  }, [pathname]);

  const optionalProducts = !step
    ? cart
    : cart.filter((product) => checked[product.productId]);

  return (
    <>
      {step > 0 && <CartAddress user={user} />}
      <TopProductsCart cart={cart} />
      <div className="space-y-6">
        {optionalProducts.map((product) => {
          return <ProductsCart key={product.id} {...product} />;
        })}
      </div>
    </>
  );
};

export default WrapperProductsCard;
