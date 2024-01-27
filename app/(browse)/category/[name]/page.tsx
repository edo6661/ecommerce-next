import { getProductsByCategory } from "@/services/product";
import Link from "next/link";
import { FaCaretRight } from "react-icons/fa6";
import FilterCatBrand from "../_components/FilterCatBrand";
import SideCategory from "../_components/SideCategory";
import SideRating from "../_components/SideRating";

const page = async ({ params }: { params: { name: string } }) => {
  const { name } = params;
  const products = await getProductsByCategory(params.name);

  return (
    <>
      <section className="container py-4 space-y-4">
        <div className="fl-center gap-2">
          <Link className=" hoveredText " href="/">
            Mugichawn
          </Link>
          <FaCaretRight />
          <Link className=" hoveredText " href="/category">
            Category
          </Link>
          <FaCaretRight />
          <p className=" focusedWord">{params.name}</p>
        </div>
        <article className=" grid grid-cols-3 items-center">
          <p className="">Filter</p>
          <div className=" col-span-2 fl-center justify-between">
            <p>Showing {products.length + " " + params.name}</p>
            <FilterCatBrand />
          </div>
        </article>
        <article className=" grid grid-cols-3 gap-2">
          <div className=" shadow-neutral-500 shadow-sm px-4 pt-2 pb-8 rounded-xl ">
            <SideCategory name={name.toUpperCase()} />
            <SideRating />
          </div>
          <div className=" col-span-3">
            <p>test</p>
          </div>
        </article>
      </section>
    </>
  );
};

export default page;
