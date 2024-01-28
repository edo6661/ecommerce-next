import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface ResultType {
  nextPage: number | null;
  products: Product[];
}

export const fetchProductsCatPagi = async (
  page: number,
  name: string,
  limit: number
): Promise<ResultType> => {
  try {
    const { data } = await axios.get(
      `/api/products/category?page=${page}&limit=${limit}&name=${name}`
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("internal error");
  }
};

const useProductCatPagi = (page: number, name: string, limit: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ["productsCat", page, name],
    queryFn: () => fetchProductsCatPagi(page, name, limit),
  });

  return { data, isLoading };
};

export default useProductCatPagi;
