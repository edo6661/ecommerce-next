import { getBrand } from "@/services/brand";
import { getCategory } from "@/services/category";

import { cn } from "@/lib/utils";
import Posters from "./_components/Posters";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { CatBrand } from "../_components/category/CatBrand";
import CatBrandSkeleton from "@/components/skeleton/CatBrandSkeleton";

export default async function Home() {
  return (
    <>
      <section className={cn("container py-4 overflow-x-hidden")}>
        <div className="grid grid-cols-3  ">
          <Posters />
        </div>
        <Separator className="my-6" />
        <article>
          <Suspense fallback={<CatBrandSkeleton />}>
            <CatBrand getData={getCategory} label="Category" />
          </Suspense>
        </article>
        <Separator className="my-6" />
        <article>
          <Suspense fallback={<CatBrandSkeleton />}>
            <CatBrand getData={getBrand} label="Brand" />
          </Suspense>
        </article>
      </section>
    </>
  );
}
