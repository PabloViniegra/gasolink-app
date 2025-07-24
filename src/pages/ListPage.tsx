import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Button,
  Select,
  SelectItem,
  Spinner,
  Card,
  CardBody,
  CardFooter,
  Chip,
} from "@heroui/react";
import {
  ArrowRight,
  MapPin,
  ChevronDown,
  ArrowUpDown,
  Bookmark,
} from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import useNearestStations from "../hooks/useNearestStations";
import useGeolocation from "../hooks/useGeolocation";
import Header from "../components/shared/Header";

const SORT_OPTIONS = [
  { key: "distance-asc", label: "Más cercanas" },
  { key: "price-asc", label: "Precio más bajo" },
  { key: "price-desc", label: "Precio más alto" },
  { key: "name-asc", label: "Nombre (A-Z)" },
];

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
  const [selectedSort, setSelectedSort] = useState<Set<string>>(
    new Set(["distance-asc"])
  );

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
          const priceA = parseFloat(
            String(a.Gasolina95) || String(a.Diesel) || "0"
          );
          const priceB = parseFloat(
            String(b.Gasolina95) || String(b.Diesel) || "0"
          );
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

  const formatDistance = (distance: number) => {
    return distance < 1
      ? `${Math.round(distance * 1000)} m`
      : `${distance.toFixed(1)} km`;
  };

  const getLowestPrice = (station: any) => {
    const prices = [
      parseFloat(station.Gasolina95 || "0") || Infinity,
      parseFloat(station.Diesel || "0") || Infinity,
      parseFloat(station.Gasolina98 || "0") || Infinity,
      parseFloat(station.DieselPremium || "0") || Infinity,
    ];
    const minPrice = Math.min(...prices);
    return isFinite(minPrice) ? minPrice.toFixed(3) : "N/A";
  };

  // Debug logs
  console.log("Geolocation:", { latitude, longitude });
  console.log("Query state:", {
    isLoading: queryNearestStations.isLoading,
    isError: queryNearestStations.isError,
    error: queryNearestStations.error,
    data: queryNearestStations.data,
  });
  console.log("Close stations:", closeStations);

  if (queryNearestStations.isLoading || !latitude || !longitude) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-screen w-full">
          <Spinner size="lg" color="primary" />
          <p className="ml-2 font-sans">Buscando estaciones cercanas...</p>
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
      <div className="w-full max-w-6xl mx-auto px-4 py-6 mt-28">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold font-display text-foreground">
              Estaciones cercanas
            </h1>
            <p className="text-muted-foreground mt-1 font-lexend">
              {closeStations?.length || 0} estaciones encontradas
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-sans text-sm text-muted-foreground whitespace-nowrap">
              Ordenar por:
            </span>
            <Select
              selectedKeys={selectedSort}
              onSelectionChange={(keys) =>
                setSelectedSort(new Set(Array.from(keys as Set<string>)))
              }
              defaultSelectedKeys={new Set(["distance-asc"])}
              size="sm"
              variant="faded"
              className="min-w-[180px] text-muted"
              startContent={<ArrowUpDown size={16} className="text-muted" />}
              selectorIcon={<ChevronDown size={16} />}
            >
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {sortedStations.map((station) => (
            <Card
              key={station.idEstacion}
              className="w-full max-w-full bg-card/50 hover:bg-card/70 transition-all duration-200 border border-border/30 hover:border-primary/30 shadow-sm hover:shadow-lg overflow-hidden flex flex-col break-words"
            >
              <CardBody className="pb-2 flex-1 flex flex-col">
                <div className="flex justify-between items-start w-full gap-2">
                  <div>
                    <h3 className="font-semibold text-lg font-lexend text-foreground hover:text-primary transition-colors break-words overflow-hidden text-ellipsis">
                      {station.nombreEstacion}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground/80 mt-1 w-full">
                      <MapPin size={14} className="mr-1 flex-shrink-0" />
                      <span className="truncate max-w-[180px] md:max-w-[200px] lg:max-w-[220px]">{station.direccion}</span>
                    </div>
                    <div className="mt-3 flex items-center">
                      <Chip variant="shadow" color="default">
                        <span className="flex items-center font-medium text-sm">
                          <Bookmark size={14} className="mr-1 flex-shrink-0" />
                          {formatDistance(station.distancia || 0)}
                        </span>
                      </Chip>
                    </div>
                  </div>
                  <div className="bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium px-3 py-1 rounded-full whitespace-nowrap transition-colors shrink-0">
                    {getLowestPrice(station)} €/L
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/30">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground/80">Gasolina 95:</div>
                    <div className="font-medium text-right text-foreground/90">
                      {station.Gasolina95
                        ? `${parseFloat(String(station.Gasolina95)).toFixed(
                            3
                          )} €`
                        : "N/A"}
                    </div>
                    <div className="text-muted-foreground/80">Diésel:</div>
                    <div className="font-medium text-right text-foreground/90">
                      {station.Diesel
                        ? `${parseFloat(String(station.Diesel)).toFixed(3)} €`
                        : "N/A"}
                    </div>
                    {station.Gasolina95 && (
                      <>
                        <div className="text-muted-foreground/80">
                          Gasolina 95:
                        </div>
                        <div className="font-medium text-right text-foreground/90">
                          {parseFloat(String(station.Gasolina95)).toFixed(3)} €
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  fullWidth
                  variant="light"
                  color="primary"
                  size="sm"
                  onPress={() => navigate(`/station/${station.idEstacion}`)}
                  endContent={<ArrowRight size={16} />}
                >
                  Ver detalles
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
