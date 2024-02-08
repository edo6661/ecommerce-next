import Title from "@/components/shared/Title";
import { getOrders } from "@/services/order";
import { AiOutlineShopping } from "react-icons/ai";
import ImageOrder from "./_components/ImageOrder";
import { Separator } from "@/components/ui/separator";
import { generateDate } from "@/helpers";
import OrdersPagination from "../category/_components/OrdersPagination";
interface SearchParamsType {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

// ! ssr pagination
const page = async ({ searchParams }: SearchParamsType) => {
  const currentPage = Number(searchParams?.page) || 1;

  const { totalPages, orders } = await getOrders(currentPage);

  return (
    <>
      <section className="container py-4 space-y-4">
        <Title label="Transaction List" />
        <div className="flex flex-col gap-6">
          {orders.map((order) => {
            return (
              <div key={order.id} className=" space-y-4">
                <div className="fl-center gap-2 flex-wrap">
                  <span>
                    <AiOutlineShopping size={25} />
                  </span>
                  <p>{generateDate(order.createdAt)}</p>
                  <div className="focusedWord fl-center gap-1 flex-wrap">
                    <p>{order.status}</p>
                    <p>MOCK INV</p>
                    <p>{order.items.length} Item</p>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div className=" space-y-4">
                    {order.items.map((item) => {
                      const { photos, name } = item.product;
                      const url = photos.split(",")[0];
                      return (
                        <div key={item.id}>
                          <ImageOrder url={url} name={name} />
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-center  ">
                    <p className="focusedWord">Total Belanja</p>
                    <p className="font-semibold">${order.total}</p>
                  </div>
                </div>
                <Separator />
              </div>
            );
          })}
        </div>
        <OrdersPagination totalPages={totalPages} />
      </section>
    </>
  );
};

export default page;
