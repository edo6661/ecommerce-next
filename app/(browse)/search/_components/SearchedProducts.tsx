import { getProductsByQuery } from "@/services/product";
import React from "react";
import ProductsCard from "../../_components/products/ProductsCard";
import OrdersPagination from "../../category/_components/OrdersPagination";
import SearchPagination from "./SearchPagination";
import Title from "@/components/shared/Title";
interface Props {
  q: string;
  limit: number;
  currentPage: number;
}
const SearchedProducts = async ({ q, limit, currentPage }: Props) => {
  const { products, totalPages } = await getProductsByQuery(
    q,
    limit,
    currentPage
  );
  return (
    <article className=" space-y-6">
      {products.length > 0 ? (
        <>
          <div className="containerProducts ">
            {products.map((product) => {
              const urls = product.photos.split(",");
              return (
                <div key={product.id}>
                  <ProductsCard key={product.id} {...product} urls={urls} />
                </div>
              );
            })}
          </div>
          <SearchPagination
            totalPages={totalPages}
            q={q}
            limit={+limit}
            currentPage={+currentPage}
          />
        </>
      ) : (
        <Title label={`0 Results ${q} products`} />
      )}
    </article>
  );
};

export default SearchedProducts;
