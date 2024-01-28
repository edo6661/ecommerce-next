import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface ResultType {
  nextPage: number | null;
  products: Product[];
}

export const fetchProductsBrandPagi = async (
  page: number,
  name: string,
  limit: number
): Promise<ResultType> => {
  try {
    const { data } = await axios.get(
      `/api/products/brand?page=${page}&limit=${limit}&name=${name}`
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("internal error");
  }
};

const useProductBrandPagi = (page: number, name: string, limit: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ["productsBrand", page, name],
    queryFn: () => fetchProductsBrandPagi(page, name, limit),
  });

  return { data, isLoading };
};

export default useProductBrandPagi;
