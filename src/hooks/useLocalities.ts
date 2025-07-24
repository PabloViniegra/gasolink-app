import { useLocalityStore } from "../stores/localityStore";
import { getLocalities } from "../services/precioilService";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export function useLocalities(provinceId?: number) {
  const { localities, selectedLocalityId, setSelectedLocalityId } =
    useLocalityStore();

  const localitiesQuery = useQuery({
    queryKey: ["localities", provinceId],
    queryFn: () => {
      if (!provinceId) return Promise.resolve([]);
      return getLocalities(provinceId);
    },
    enabled: !!provinceId,
  });

  useEffect(() => {
    if (localitiesQuery.data) {
      useLocalityStore.setState({ localities: localitiesQuery.data });
    }
  }, [localitiesQuery.data]);

  return {
    localities: localities || [],
    isLoading: provinceId
      ? localitiesQuery.isLoading ||
        localitiesQuery.isPending ||
        localitiesQuery.isFetching
      : false,
    selectedLocalityId,
    setSelectedLocalityId,
  };
}
