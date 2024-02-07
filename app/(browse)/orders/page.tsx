import { getOrders } from "@/services/order";
import React from "react";

const page = async () => {
  const orders = await getOrders();

  // TODO

  return (
    <>
      {orders.map((order) => {
        return (
          <div key={order.id}>
            <p>{order.total}</p>
            {order.items.map((item) => {
              return (
                <div key={item.id}>
                  <p>{item.product.name}</p>
                  <p>{item.quantity}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default page;
