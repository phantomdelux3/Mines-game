import { getMinesOutcome } from "@/service/static/mines";
import { useQuery } from "@tanstack/react-query";

export const useFetchGuides = () => {
    const { data, isFetching, error, status } = useQuery({
      queryKey: [],
      queryFn: () => getMinesOutcome(),
      refetchOnWindowFocus: false,
    })

    return { data, isFetching, error, status };
};