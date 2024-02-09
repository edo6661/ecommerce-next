import Title from "@/components/shared/Title";
import React, { Suspense } from "react";
import SearchedProducts from "./_components/SearchedProducts";
import { ProductsListSkeleton } from "../_components/products/ProductsList";
import { getProductsByQuery } from "@/services/product";
import { CardProductsSkeleton } from "../_components/products/ProductsCard";

interface SearchParamsType {
  searchParams: {
    q: string;
    limit: number;
    page: number;
  };
}

const page = async ({ searchParams }: SearchParamsType) => {
  const { q, limit, page } = searchParams;
  const { products } = await getProductsByQuery(q, +limit, +page);

  return (
    <section className="container py-4">
      <Title label="Search" />
      <Suspense
        fallback={
          <div className="containerProducts">
            {Array.from({ length: products.length }, (_, i) => (
              <CardProductsSkeleton key={i} />
            ))}
          </div>
        }
      >
        <SearchedProducts q={q} limit={+limit} currentPage={+page} />
      </Suspense>
    </section>
  );
};

export default page;
