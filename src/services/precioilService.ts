import {
  DetailStation,
  Historic,
  Locality,
  NearStation,
  Province,
  Station,
} from "../types";
import apiPrecioil from "../api/apiPrecioil";

export const getProvinces = async (): Promise<Province[]> => {
  const { data } = await apiPrecioil.get<Province[]>(`/provincias`);
  return data;
};

export const getLocalities = async (
  provinceId: number
): Promise<Locality[]> => {
  const { data } = await apiPrecioil.get<Locality[]>(
    `/municipios/provincia/${provinceId}`
  );
  return data;
};

export const getStations = async (localityId: number): Promise<Station[]> => {
  const { data } = await apiPrecioil.get<Station[]>(
    `/estaciones/municipio/${localityId}`
  );
  return data;
};

export const getNearestStations = async ({
  latitud,
  longitud,
  radio = 10,
  pagina = 1,
  limite = 10,
}: {
  latitud: number;
  longitud: number;
  radio: number;
  pagina: number;
  limite: number;
}): Promise<NearStation[]> => {
  const { data } = await apiPrecioil.get<NearStation[]>(`/estaciones/radio`, {
    params: {
      latitud,
      longitud,
      radio,
      pagina,
      limite,
    },
  });
  return data;
};

export const getStationDetail = async (
  stationId: number
): Promise<DetailStation> => {
  const { data } = await apiPrecioil.get<DetailStation>(
    `/estaciones/detalles/${stationId}`
  );
  return data;
};

export const getStationHistoric = async ({
  stationId,
  fechaInicio,
  fechaFin,
}: {
  stationId: number;
  fechaInicio: string;
  fechaFin: string;
}): Promise<Historic> => {
  const { data } = await apiPrecioil.get<Historic>(
    `/estaciones/historico/${stationId}`,
    {
      params: {
        fechaInicio,
        fechaFin,
      },
    }
  );
  return data;
};
