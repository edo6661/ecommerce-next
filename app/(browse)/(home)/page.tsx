import { getBrand } from "@/services/brand";
import { getCategory } from "@/services/category";

import { cn } from "@/lib/utils";
import Posters from "./_components/Posters";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { CatBrand } from "../_components/category/CatBrand";
import CatBrandSkeleton from "@/components/skeleton/CatBrandSkeleton";
import ProductsList from "../_components/products/ProductsList";
import { fetchProducts } from "@/hooks/useProductInfinite";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import getQueryClient from "@/lib/queryClient";

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => lastPage.nextPage,
  });

  return (
    <>
      <section className={cn("container py-4 overflow-x-hidden")}>
        <article className="grid grid-cols-3 gap-x-4">
          <Posters />
        </article>
        <Separator />
        <article>
          <Suspense fallback={<CatBrandSkeleton label="Category" />}>
            <CatBrand getData={getCategory} label="Category" />
          </Suspense>
        </article>
        <Separator />
        <article>
          <Suspense fallback={<CatBrandSkeleton label="Category" />}>
            <CatBrand getData={getBrand} label="Brand" />
          </Suspense>
        </article>
        <Separator />

        <article className="pb-4">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductsList />
          </HydrationBoundary>
        </article>
        <Separator />
      </section>
    </>
  );
}
