import { useEffect } from "react";
import { getNearestStations } from "../services/precioilService";
import { useCloseStationsStore } from "../stores/closeStationsStore";
import { useQuery } from "@tanstack/react-query";

export default function useNearestStations() {
  const {
    closeStations,
    radio,
    pagina,
    limite,
    latitud,
    longitud,
    setCloseStations,
    setLimite,
    setPagina,
    setRadio,
    setLatitud,
    setLongitud
  } = useCloseStationsStore();

  const queryNearestStations = useQuery({
    queryKey: ["nearest-stations", radio, pagina, limite, latitud, longitud],
    queryFn: () => {
      if (!latitud || !longitud) {
        return Promise.resolve([]);
      }
      return getNearestStations({
        latitud,
        longitud,
        radio,
        pagina,
        limite,
      });
    },
  });

  useEffect(() => {
    if (queryNearestStations.data) {
      setCloseStations(queryNearestStations.data);
    }
  }, [queryNearestStations.data]);

  useEffect(() => {
    if (queryNearestStations.isError) {
      console.error(
        "Error fetching nearest stations:",
        queryNearestStations.error
      );
    }
  }, [queryNearestStations.isError]);

  return {
    closeStations,
    radio,
    pagina,
    limite,
    setCloseStations,
    setLimite,
    setPagina,
    setRadio,
    setLatitud,
    setLongitud,
    queryNearestStations
  };
}
