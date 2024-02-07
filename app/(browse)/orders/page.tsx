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
const page = async ({ searchParams }: SearchParamsType) => {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";

  const orders = await getOrders(query, currentPage);

  return (
    <>
      <section className="container py-4">
        <Title label="Transaction List" />
        <div className="flex flex-col gap-6">
          {orders.orders.map((order) => {
            return (
              <div key={order.id} className=" space-y-4">
                <div className="fl-center gap-2">
                  <span>
                    <AiOutlineShopping size={25} />
                  </span>
                  <p>{generateDate(order.createdAt)}</p>
                  <p>{order.status}</p>
                  <p className="focusedWord">MOCK INV</p>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div className=" space-y-4">
                    {order.items.map((item) => {
                      const { photos, name } = item.product;
                      const url = photos.split(",")[0];
                      return (
                        <div key={item.id} className="">
                          <ImageOrder url={url} name={name} />
                        </div>
                      );
                    })}
                  </div>
                  <div className="fl-col-center  ">
                    <p className="focusedWord">Total Belanja</p>
                    <p className="font-semibold">${order.total}</p>
                  </div>
                </div>
                <Separator />
              </div>
            );
          })}
        </div>
        <OrdersPagination totalPages={orders.totalPages} />
      </section>
    </>
  );
};

export default page;
