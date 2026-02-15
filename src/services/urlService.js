import { useQuery } from "@tanstack/react-query";
import useApiFetch from "@/hooks/useApiFetch";

export const useUrls = () => {
  const { fetchData } = useApiFetch();

  return useQuery({
    queryKey: ["urls"],
    queryFn: () =>
      fetchData({
        url: "/",
        options: { method: "GET" },
      }),
    staleTime: 1000 * 60 * 5, // 5 minutos en cache
  });
};
