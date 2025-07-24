import { useEffect } from "react";
import {
  getStationDetail,
  getStationHistoric,
} from "../services/precioilService";
import { useStationStore } from "../stores/stationsStore";
import { useQuery } from "@tanstack/react-query";

export default function useStation(stationId: number) {
  const {
    selectedStation,
    setSelectedStation,
    selectedStationHistoric,
    setSelectedStationHistoric,
  } = useStationStore();

  const queryStation = useQuery({
    queryKey: ["station", stationId],
    queryFn: () => getStationDetail(stationId),
  });

  const queryStationHistoric = useQuery({
    queryKey: ["station-historic", stationId],
    queryFn: () =>
      getStationHistoric({
        stationId,
        fechaInicio: "2010-01-01",
        fechaFin: new Date().toISOString().split("T")[0],
      }),
  });

  useEffect(() => {
    if (queryStation.data) {
      setSelectedStation(queryStation.data);
    }
  }, [queryStation.data]);

  useEffect(() => {
    if (queryStation.isError) {
      console.error("Error al obtener la estación:", queryStation.error);
    }
  }, [queryStation.isError]);

  useEffect(() => {
    if (queryStationHistoric.data) {
      setSelectedStationHistoric(queryStationHistoric.data);
    }
  }, [queryStationHistoric.data]);

  useEffect(() => {
    if (queryStationHistoric.isError) {
      console.error(
        "Error al obtener el histórico de la estación:",
        queryStationHistoric.error
      );
    }
  }, [queryStationHistoric.isError]);

  return {
    selectedStation,
    isLoading:
      queryStation.isLoading ||
      queryStation.isPending ||
      queryStation.isFetching ||
      queryStationHistoric.isLoading ||
      queryStationHistoric.isPending ||
      queryStationHistoric.isFetching,
    selectedStationHistoric,
  };
}
