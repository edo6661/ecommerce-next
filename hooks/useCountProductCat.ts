import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCountProductCat = async (name: string) => {
  try {
    const { data } = await axios.get(
      `/api/products/category/count?name=${name}`
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};

const useCountProductCat = (name: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["countProductCat", name],
    queryFn: () => fetchCountProductCat(name),
  });
  return { data, isLoading, isError, error };
};

export default useCountProductCat;
