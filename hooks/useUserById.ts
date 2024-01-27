import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUserById = (id: string) => {
  const fetchUser = async (id: string) => {
    try {
      const { data } = await axios.get(`/api/user/?ownerId=${id}`);
      return data.username;
    } catch (err) {
      console.error(err);
      throw new Error("Internal Error");
    }
  };

  const { data: username, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return { username, isLoading };
};

export default useUserById;
