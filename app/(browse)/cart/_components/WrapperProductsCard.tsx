/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Cart, Product, User } from "@prisma/client";
import ProductsCart from "./ProductsCart";
import { useCallback, useEffect, useMemo, useState } from "react";
import useMugi from "@/hooks/useMugi";
import TopProductsCart from "./TopProductsCart";
import CartAddress from "./CartAddress";
import { motion, AnimatePresence } from "framer-motion";

const WrapperProductsCard = ({
  cart,
  user,
}: {
  cart: (Cart & { product: Product })[];
  user: User;
}) => {
  const { setTotalPrice, step, checked, setChecked, setCheckedAll } = useMugi(
    (state) => state
  );

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
      {/* <Button onClick={() => handleCheckedAll()}>
        {allChecked ? "Unselect All" : "Select All"}
      </Button> */}
    </>
  );
};

export default WrapperProductsCard;
