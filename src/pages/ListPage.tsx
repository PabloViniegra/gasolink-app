import { useState, useMemo, useEffect } from "react";
import { Spinner, Button } from "@heroui/react";
import MainLayout from "../layouts/MainLayout";
import useNearestStations from "../hooks/useNearestStations";
import useGeolocation from "../hooks/useGeolocation";
import Header from "../components/shared/Header";
import ListHeader from "../components/stations/ListHeader";
import StationGridCards from "../components/stations/StationGridCards";
import { useNavigate } from "react-router";

export default function ListPage() {
  const navigate = useNavigate();
  const { latitude, longitude } = useGeolocation();
  const {
    closeStations,
    queryNearestStations,
    setRadio,
    setLatitud,
    setLongitud,
  } = useNearestStations();

  const handleStationClick = (stationId: number) => {
    navigate(`/station/${stationId}`);
  };
  const [selectedSort, setSelectedSort] = useState<Set<string>>(
    new Set(["distance-asc"])
  );

  const SORT_OPTIONS = [
    { key: "distance-asc", label: "Más cercanas" },
    { key: "price-asc", label: "Precio más bajo" },
    { key: "price-desc", label: "Precio más alto" },
    { key: "name-asc", label: "Nombre (A-Z)" },
  ];

  useEffect(() => {
    if (latitude && longitude) {
      setLatitud(latitude);
      setLongitud(longitude);
      setRadio(20);
    }
  }, [latitude, longitude, setLatitud, setLongitud, setRadio]);

  const sortedStations = useMemo(() => {
    if (!closeStations) return [];
    let field = "distance";
    let order = "asc";

    try {
      const sortKey =
        Array.from(selectedSort)[0] || SORT_OPTIONS[0]?.key || "distance-asc";
      if (typeof sortKey === "string") {
        const [f, o] = sortKey.split("-");
        if (f && o) {
          field = f;
          order = o;
        }
      }
    } catch (e) {
      console.warn("Error processing sort options, using defaults:", e);
    }

    return [...closeStations].sort((a, b) => {
      switch (field) {
        case "distance":
          return order === "asc"
            ? (a.distancia || 0) - (b.distancia || 0)
            : (b.distancia || 0) - (a.distancia || 0);
        case "price": {
          const getMinPrice = (station: any) => {
            const prices = [
              station.Gasolina95 !== null
                ? parseFloat(String(station.Gasolina95))
                : null,
              station.Diesel !== null
                ? parseFloat(String(station.Diesel))
                : null,
            ].filter((price): price is number => price !== null);
            return prices.length > 0 ? Math.min(...prices) : Infinity;
          };

          const priceA = getMinPrice(a);
          const priceB = getMinPrice(b);

          return order === "asc" ? priceA - priceB : priceB - priceA;
        }
        case "name":
          return order === "asc"
            ? a.nombreEstacion.localeCompare(b.nombreEstacion)
            : b.nombreEstacion.localeCompare(a.nombreEstacion);
        default:
          return 0;
      }
    });
  }, [closeStations, selectedSort]);

  if (queryNearestStations.isLoading || !latitude || !longitude) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-screen w-full">
          <Spinner size="lg" color="primary" />
          <p className="ml-2 font-sans text-foreground">
            Buscando estaciones cercanas...
          </p>
        </div>
      </MainLayout>
    );
  }

  if (queryNearestStations.isError) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-64 text-center p-4">
          <p className="text-red-500 mb-2">Error al cargar las estaciones</p>
          <p className="text-sm text-muted-foreground">
            {String(queryNearestStations.error)}
          </p>
          <Button
            className="mt-4"
            onPress={() => queryNearestStations.refetch()}
          >
            Reintentar
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Header />
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-6 mt-28 overflow-x-hidden">
        <ListHeader
          SORT_OPTIONS={SORT_OPTIONS}
          stationCount={closeStations?.length || 0}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
        />

        <StationGridCards
          stations={sortedStations}
          onStationClick={handleStationClick}
        />
      </div>
    </MainLayout>
  );
}
