import { getBrand } from "@/services/brand";
import { getCategory } from "@/services/category";

import { cn } from "@/lib/utils";
import Posters from "./_components/Posters";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { Category } from "../_components/category/Category";
import CategorySkeleton from "../_components/skeleton/CategorySkeleton";

export default async function Home() {
  const brands = await getBrand();

  return (
    <>
      <section className={cn("container py-4 overflow-x-hidden")}>
        <div className="grid grid-cols-3  ">
          <Posters />
        </div>
        <Separator className="my-6" />
        <article>
          <Suspense fallback={<CategorySkeleton />}>
            <Category />
          </Suspense>
          <CategorySkeleton />
        </article>
      </section>
    </>
  );
}
