import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname } from "next/navigation";

const fetchCountProductCat = async (name: string) => {
  try {
    const { data } = await axios.get(`/api/products/brand/count?name=${name}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};

const useCountProductBrand = (name: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["countProductBrand", name],
    queryFn: () => fetchCountProductCat(name),
  });
  return { data, isLoading, isError, error };
};

export default useCountProductBrand;
