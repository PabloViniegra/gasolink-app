import StationCard from "./StationCard";
import CustomPagination from "../shared/CustomPagination";
import { Station } from "../../types";

type Props = {
  stations: Station[];
  allStations: Station[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  isLoading: boolean;
  error: Error | null;
  refetch?: () => Promise<any>;
};

export default function StationsPanel({
  stations,
  allStations,
  currentPage,
  totalPages,
  setCurrentPage,
  isLoading,
  error,
  refetch,
}: Props) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400 text-sm font-sans-serif font-medium tracking-tight">
          Cargando estaciones...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-red-400 text-sm font-sans-serif font-medium tracking-tight text-center">
          Error al cargar las estaciones: {error.message || "Error desconocido"}
        </p>
        {refetch && (
          <button
            onClick={() => refetch()}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Reintentar
          </button>
        )}
      </div>
    );
  }

  if (allStations.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400 text-sm font-sans-serif font-medium tracking-tight">
          No hay estaciones disponibles. Selecciona un municipio.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-4">
        {stations.map((station) => (
          <StationCard key={station.idEstacion} station={station} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 pb-6">
          <div className="text-center text-sm text-gray-400 mb-2">
            Mostrando {stations.length} de {allStations.length} estaciones
          </div>
          <CustomPagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
