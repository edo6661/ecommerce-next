import getQueryClient from "@/lib/queryClient";
import { dehydrate, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchProducts = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(`/api/products?page=${pageParam}&limit=6`);
  return data;
};

const useProductInfinite = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const products = data?.pages.flatMap((page) => page.products);

  return {
    products,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    refetch,
  };
};

export default useProductInfinite;
