import TemplateCart from "./_components/TemplateCart";
import { getSelf } from "@/services/user";
import { getCartByUserId } from "@/services/cart";
import { getShipping } from "@/services/shipping";
import { getPayment } from "@/services/payment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart ",
  description: "Cart Page Mugichawn",
};

const page = async () => {
  const user = await getSelf();
  const cart = await getCartByUserId(user?.id!);
  const cartExist = cart.length > 0;
  const shipping = await getShipping();
  const payment = await getPayment();

  return (
    <TemplateCart
      cart={cart}
      cartExist={cartExist}
      label="Cart"
      user={user}
      payment={payment}
      shipping={shipping}
    />
  );
};

export default page;
