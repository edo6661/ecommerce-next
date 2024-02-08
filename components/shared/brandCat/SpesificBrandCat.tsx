import { CatBrand } from "@/app/(browse)/_components/category/CatBrand";
import FilterCatBrand from "@/app/(browse)/category/_components/FilterCatBrand";
import LengthCatBrand from "@/app/(browse)/category/_components/LengthCatBrand";
import ProductsCatBrand from "@/app/(browse)/category/_components/ProductsCatBrand";
import SideCatBrand from "@/app/(browse)/category/_components/SideCatBrand";
import SideRating from "@/app/(browse)/category/_components/SideRating";
import CatBrandSkeleton from "@/components/skeleton/CatBrandSkeleton";
import { upperFirst } from "@/helpers";
import { getCategory } from "@/services/category";
import { Category } from "@prisma/client";
import Link from "next/link";
import React, { Suspense } from "react";
import { FaCaretRight } from "react-icons/fa";

interface Props {
  name: string;
  page: number;
  limit: number;
  label: string;
  getData: () => Promise<Category[]>;
}

// ! csr pagination

const SpesificBrandCat = ({ name, page, limit, label, getData }: Props) => {
  return (
    <section className="container py-4 space-y-4 ">
      <div className="fl-center gap-2">
        <Link className=" hoveredText " href="/">
          Mugichawn
        </Link>
        <FaCaretRight />
        <p className=" focusedWord">{decodeURIComponent(name)}</p>
      </div>
      <article className=" grid grid-cols-3 items-center">
        <p>Filter</p>
        <div className=" col-span-2 fl-center justify-between">
          <LengthCatBrand label={label} name={name} />
          <FilterCatBrand />
        </div>
      </article>
      <article className=" sm:grid sm:grid-cols-3 sm:gap-8 sm:space-y-0 space-y-8 min-h-screen">
        <div className=" sm:block hidden borderShadowNeutral px-4 pt-2 pb-8 rounded-xl ">
          <SideCatBrand
            label={label}
            getData={getData}
            name={name.toUpperCase()}
          />
          <SideRating />
        </div>
        <div className="sm:hidden block">
          <Suspense fallback={<CatBrandSkeleton label={upperFirst(label)} />}>
            <CatBrand getData={getData} label={upperFirst(label)} />
          </Suspense>
        </div>
        <div className=" sm:col-span-2 space-y-8">
          <ProductsCatBrand name={name} pageParams={page} limitParams={limit} />
        </div>
      </article>
    </section>
  );
};

export default SpesificBrandCat;
