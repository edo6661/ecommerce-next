import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

interface Promise {
  products: Product[];
  totalPages: number;
}

const fetchProductsQuery = async (
  page: number,
  limit: number,
  query: string
) => {
  try {
    const { data } = await axios.get<Promise>(
      `/api/products/search?page=${page}&limit=${limit}&query=${query}`
    );

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Error");
  }
};

const useProductsQuery = (page: number, limit: number, query: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["products", page, limit, query],
    queryFn: () => fetchProductsQuery(page, limit, query),
    enabled: !!query,
  });

  return { data, isLoading };
};

export default useProductsQuery;
