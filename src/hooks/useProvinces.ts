import { getProvinces } from "../services/precioilService";
import { useProvinceStore } from "../stores/provinceStore";
import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

export function useProvinces() {
  const { provinces, setProvinces, setSelectedProvinceId, selectedProvinceId } = useProvinceStore();

  const fetchProvinces = useQuery({
    queryKey: ["provinces"],
    queryFn: getProvinces,
  });

  useEffect(() => {
    if (fetchProvinces.data) {
      setProvinces(fetchProvinces.data);
    }
  }, [fetchProvinces.data]);

  useEffect(() => {
    if (fetchProvinces.error) {
      console.error("Error fetching provinces:", fetchProvinces.error);
    }
  }, [fetchProvinces.error]);

  const spanishProvinces = useMemo(
    () =>
      provinces
        .filter(
          (province) =>
            province.nombreProvincia === province.nombreProvincia.toUpperCase()
        )
        .map((province) => ({
          ...province,
          nombreProvincia:
            province.nombreProvincia.charAt(0).toUpperCase() +
            province.nombreProvincia.slice(1).toLowerCase(),
        })),
    [provinces]
  );

  return {
    provinces: spanishProvinces,
    isLoading:
      fetchProvinces.isLoading ||
      fetchProvinces.isPending ||
      fetchProvinces.isFetching,
    setSelectedProvinceId,
    selectedProvinceId,
  };
}
