"use client";
import { Skeleton } from "@/components/ui/skeleton";
import useCountProductBrand from "@/hooks/useCountProductBrand";
import useCountProductCat from "@/hooks/useCountProductCat";
import { usePathname } from "next/navigation";

const LengthCatBrand = ({ name, label }: { name: string; label: string }) => {
  const pathName = usePathname();

  const brandPathname = pathName.includes("brand");

  const {
    data: dataCat,
    isLoading: isLoadCat,
    isError: isErrCat,
    error: errCat,
  } = useCountProductCat(name);

  const {
    data: dataBrand,
    isLoading: isLoadBrand,
    isError: isErrBrand,
    error: errBrand,
  } = useCountProductBrand(name);

  const isLoading = !brandPathname ? isLoadCat : isLoadBrand;
  const isErr = !brandPathname ? isErrCat : isErrBrand;
  const err = !brandPathname ? errCat : errBrand;

  if (isLoading) {
    return <Skeleton className=" w-32 h-[24px]" />;
  }
  if (isErr) {
    return <p>{err?.message}</p>;
  }

  const data = brandPathname ? dataBrand : dataCat;

  return data?.totalProducts ? (
    <p> {data?.totalProducts} Results</p>
  ) : (
    <p>No Product With {`${decodeURIComponent(name)} ${label}`}</p>
  );
};

export default LengthCatBrand;
