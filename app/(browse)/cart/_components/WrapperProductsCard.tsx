"use client";

import { Cart, Product } from "@prisma/client";
import ProductsCart from "./ProductsCart";
import { useCallback, useEffect, useMemo, useState } from "react";
import useMugi from "@/hooks/useMugi";
import { Button } from "@/components/ui/button";

const WrapperProductsCard = ({
  cart,
}: {
  cart: (Cart & { product: Product })[];
}) => {
  const { setTotalPrice } = useMugi((state) => state);

  const initialKey = cart.reduce(
    (obj, product) => ({
      ...obj,
      [product.productId]: false,
    }),
    {}
  );

  const [checked, setChecked] = useState<Record<string, boolean>>(initialKey);

  const handleChecked = useCallback((id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleCheckedAll = useCallback(() => {
    setChecked((prev) => {
      const allChecked = Object.values(prev).every((value) => value === true);
      return Object.keys(prev).reduce(
        (obj, key) => ({ ...obj, [key]: !allChecked }),
        {}
      );
    });
  }, []);

  const totalPrice = useMemo(() => {
    return cart
      .filter((product) => checked[product.productId])
      .reduce(
        (sum, product) => sum + product?.product?.price! * product.quantity,
        0
      );
  }, [cart, checked]);

  useEffect(() => {
    setTotalPrice(totalPrice);
  }, [totalPrice]);

  const allChecked = Object.values(checked).every((value) => value === true);

  return (
    <>
      {cart.map((product) => {
        return (
          <ProductsCart
            key={product.id}
            {...product}
            handleChecked={handleChecked}
            checked={checked}
          />
        );
      })}
      <Button onClick={() => handleCheckedAll()}>
        {allChecked ? "Unselect All" : "Select All"}
      </Button>
    </>
  );
};

export default WrapperProductsCard;
