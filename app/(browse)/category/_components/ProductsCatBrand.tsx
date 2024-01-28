"use client";

import useProductCatPagi from "@/hooks/useProductCatPagi";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ProductsCard, {
  CardProductsSkeleton,
} from "../../_components/products/ProductsCard";
import { Button } from "@/components/ui/button";
import useCountProductCat from "@/hooks/useCountProductCat";
import useProductBrandPagi from "@/hooks/useProductBrandPagi";
import useCountProductBrand from "@/hooks/useCountProductBrand";

interface Props {
  name: string;
  pageParams: number;
  limitParams: number;
}

const ProductsCatBrand = ({ name, pageParams, limitParams }: Props) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const brandPathname = pathName.includes("brand");

  const { data: catProducts, isLoading: isLoadingCat } = useProductCatPagi(
    pageParams,
    name,
    limitParams
  );

  const { data: brandProducts, isLoading: isLoadingBrand } =
    useProductBrandPagi(pageParams, name, limitParams);

  const { data: allProductCatLength } = useCountProductCat(name);
  const { data: allProductsBrandLength } = useCountProductBrand(name);

  const handlePageClick = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(pageNumber));
    params.set("limit", String(limitParams));
    router.push(`${pathName}?${params.toString()}`);
  };

  const totalPages = Math.ceil(
    !brandPathname
      ? allProductCatLength?.totalProducts / limitParams
      : allProductsBrandLength?.totalProducts / limitParams
  );

  return (
    <>
      <div className="containerProducts ">
        {brandPathname
          ? brandProducts?.products.map((product) => {
              const urls = product.photos.split(",");
              return (
                <div key={product.id}>
                  <ProductsCard key={product.id} {...product} urls={urls} />
                </div>
              );
            })
          : catProducts?.products.map((product) => {
              const urls = product.photos.split(",");
              return (
                <div key={product.id}>
                  <ProductsCard key={product.id} {...product} urls={urls} />
                </div>
              );
            })}
      </div>
      {(isLoadingCat || isLoadingBrand) && (
        <div className="containerProducts">
          {Array.from({ length: limitParams }).map((_, i) => (
            <div key={i}>
              <CardProductsSkeleton />
            </div>
          ))}
        </div>
      )}
      <div className=" mx-auto fl-center justify-center">
        {totalPages > 1 &&
          Array.from({ length: totalPages }).map((_, i, arr) => {
            const disableCurrentPage = i + 1 === pageParams;
            const isFirstOrIsEndPage = i === 0 || i === arr.length - 1;
            const isNearCurrentPage = Math.abs(pageParams - (i + 1)) <= 1;

            return (
              (isFirstOrIsEndPage || isNearCurrentPage) && (
                <Button
                  key={i}
                  onClick={() => handlePageClick(i + 1)}
                  disabled={disableCurrentPage}
                  className=" rounded-none"
                >
                  {i + 1}
                </Button>
              )
            );
          })}
      </div>
    </>
  );
};

export default ProductsCatBrand;
