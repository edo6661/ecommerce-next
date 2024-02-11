"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ProductsCard, { CardProductsSkeleton } from "./ProductsCard";
import Title from "@/components/shared/Title";
import useProductInfinite from "@/hooks/useProductInfinite";

const ProductsList = () => {
  const [ref, inView] = useInView({});

  const {
    products,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
  } = useProductInfinite();

  useEffect(() => {
    const fetchData = async () => {
      if (!inView || isFetchingNextPage || isFetching) {
        return;
      }
      fetchNextPage();
    };
    fetchData();
  }, [inView, isFetchingNextPage, isFetching]);

  return (
    <>
      {!products?.length ? (
        <Title label={`Empty Product`} />
      ) : (
        <Title label="Products" />
      )}
      <div className="containerProducts ">
        {products?.map((product, index) => {
          const urls = product.photos.split(",");
          return (
            <div
              key={product.id}
              ref={index + 1 === products.length ? ref : null}
            >
              <ProductsCard key={product.id} {...product} urls={urls} />
            </div>
          );
        })}
        {isFetchingNextPage && <ProductsListSkeleton />}
        {isLoading && <ProductsListSkeleton />}
        {!products?.length || hasNextPage || isFetching ? null : (
          <Title
            label="No More Products to fetch"
            className=" text-center mt-4 col-span-full"
          />
        )}
      </div>
    </>
  );
};

export const ProductsListSkeleton = () => {
  return Array.from({ length: 6 }).map((_, i) => (
    <CardProductsSkeleton key={i} />
  ));
};

export default ProductsList;
