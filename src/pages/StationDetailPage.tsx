import React from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, MapPin, Clock, Info, Navigation, Heart } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import useStation from "../hooks/useStation";
import useGeolocation from "../hooks/useGeolocation";
import { useFavorites } from "../hooks/useFavorites";
import { Button, Skeleton, Tooltip } from "@heroui/react";
import "../styles/globals.css";
import HistoricStation from "../components/stations/HistoricStation";

const StationDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { latitude, longitude } = useGeolocation();
  const { selectedStation, selectedStationHistoric, isLoading } = useStation(
    Number(id)
  );
  const { addFavorite, removeFavourite, isFavorite } = useFavorites();

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="mb-6">
            <Skeleton className="h-8 w-64 rounded-lg">
              <div className="h-8 bg-default-300 rounded-lg" />
            </Skeleton>
          </div>

          <div className="bg-card/50 border border-border rounded-xl p-6 mb-8 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <Skeleton className="h-9 w-80 mb-2 rounded-lg">
                  <div className="h-9 bg-default-300 rounded-lg" />
                </Skeleton>
                <Skeleton className="h-5 w-64 rounded-lg">
                  <div className="h-5 bg-default-200 rounded-lg" />
                </Skeleton>
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-accent/20 p-4 rounded-lg border border-border/50"
                >
                  <Skeleton className="h-5 w-24 mb-3 rounded-lg">
                    <div className="h-5 bg-default-200 rounded-lg" />
                  </Skeleton>
                  <Skeleton className="h-4 w-32 rounded-lg">
                    <div className="h-4 bg-default-300 rounded-lg" />
                  </Skeleton>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="bg-card/50 border border-border rounded-xl p-6"
              >
                <Skeleton className="h-6 w-36 mb-4 rounded-lg">
                  <div className="h-6 bg-default-200 rounded-lg" />
                </Skeleton>
                <div className="space-y-3">
                  {[1, 2, 3].map((subItem) => (
                    <div
                      key={subItem}
                      className="flex justify-between items-center"
                    >
                      <Skeleton className="h-4 w-24 rounded-lg">
                        <div className="h-4 bg-default-200 rounded-lg" />
                      </Skeleton>
                      <Skeleton className="h-4 w-16 rounded-lg">
                        <div className="h-4 bg-default-300 rounded-lg" />
                      </Skeleton>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!selectedStation) {
    return (
      <MainLayout>
        <div className="w-full bg-background min-h-screen flex items-center justify-center p-4">
          <div className="bg-card/50 border border-border rounded-lg p-6 max-w-md w-full">
            <div className="text-destructive border-l-4 border-destructive pl-4 py-2">
              <p className="font-sans font-bold text-foreground">
                Estación no encontrada
              </p>
              <p className="font-sans text-foreground/80 mt-1">
                No se encontró información para la estación solicitada.
              </p>
              <Button
                variant="ghost"
                onPress={() => navigate(-1)}
                className="mt-4 font-sans"
              >
                Volver atrás
              </Button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            onPress={() => navigate(-1)}
            className="group relative font-sans text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 px-3 py-2 -ml-3 rounded-lg hover:bg-accent/20"
            startContent={
              <div className="relative mr-1.5">
                <ArrowLeft
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-x-0.5"
                />
              </div>
            }
          >
            <span className="relative">
              Volver
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-primary/40 group-hover:w-full transition-all duration-300"></span>
            </span>
          </Button>
        </div>
        <div className="bg-card/50 border border-border rounded-xl p-6 mb-8 backdrop-blur-sm relative">
          <div className="absolute top-6 right-6 flex gap-2">
            <Tooltip content={isFavorite(selectedStation?.idEstacion.toString()) ? "Quitar de favoritos" : "Añadir a favoritos"}>
              <Button
                isIconOnly
                variant="flat"
                size="sm"
                className={`${
                  isFavorite(selectedStation?.idEstacion.toString())
                    ? 'text-danger hover:bg-danger/10'
                    : 'text-foreground/60 hover:bg-accent/20 hover:text-foreground/80'
                } transition-colors`}
                onPress={() => {
                  if (!selectedStation) return;
                  
                  const stationId = selectedStation.idEstacion.toString();
                  if (isFavorite(stationId)) {
                    removeFavourite(stationId);
                  } else {
                    addFavorite({
                      id: stationId,
                      name: selectedStation.nombreEstacion,
                      nombreEstacion: selectedStation.nombreEstacion,
                      direccion: selectedStation.direccion,
                      localidad: selectedStation.localidad,
                      horario: selectedStation.horario,
                      latitud: selectedStation.latitud,
                      longitud: selectedStation.longitud
                    });
                  }
                }}
                isDisabled={!selectedStation}
              >
                <Heart 
                  size={18} 
                  fill={
                    isFavorite(selectedStation?.idEstacion.toString()) 
                      ? 'currentColor' 
                      : 'none'
                  } 
                />
              </Button>
            </Tooltip>
            
            <Tooltip content="Abrir en Google Maps">
              <Button
                isIconOnly
                variant="flat"
                size="sm"
                className="bg-primary/10 hover:bg-primary/20 text-primary"
                onPress={() => {
                  if (selectedStation?.latitud && selectedStation?.longitud) {
                    const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${selectedStation.latitud},${selectedStation.longitud}&travelmode=driving`;
                    window.open(url, "_blank");
                  }
                }}
                isDisabled={
                  !selectedStation?.latitud ||
                  !selectedStation?.longitud ||
                  !latitude ||
                  !longitude
                }
              >
                <Navigation size={18} />
              </Button>
            </Tooltip>
          </div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground font-sans mb-1">
              {selectedStation.nombreEstacion}
            </h1>
            <div className="flex items-center text-foreground/70 font-sans">
              <MapPin size={16} className="mr-1.5" />
              <p>{selectedStation.direccion || "Dirección no disponible"}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-accent/20 p-4 rounded-lg border border-border/50">
              <h3 className="font-sans font-semibold text-foreground/80 mb-1.5 flex items-center">
                <Clock size={16} className="mr-2 text-primary" />
                Horario
              </h3>
              <p className="font-lexend text-foreground/70">
                {selectedStation.horario || "24 horas"}
              </p>
            </div>
            <div className="bg-accent/20 p-4 rounded-lg border border-border/50">
              <h3 className="font-sans font-semibold text-foreground/80 mb-1.5 flex items-center">
                <MapPin size={16} className="mr-2 text-primary" />
                Municipio
              </h3>
              <p className="font-sans text-foreground/70">
                {selectedStation.localidad || "No disponible"}
              </p>
            </div>
            <div className="bg-accent/20 p-4 rounded-lg border border-border/50">
              <h3 className="font-sans font-semibold text-foreground/80 mb-1.5 flex items-center">
                <Info size={16} className="mr-2 text-primary" />
                Estado
              </h3>
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                <span className="font-sans text-foreground/70">
                  Abierto ahora
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-card/50 border border-border rounded-xl p-6 mb-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-foreground font-sans mb-6">
            Precios actuales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: "Gasolina 95",
                price: selectedStation.Gasolina95,
                color: "text-chart-1",
              },
              {
                name: "Gasolina 98",
                price: selectedStation.Gasolina98,
                color: "text-chart-2",
              },
              {
                name: "Diésel",
                price: selectedStation.Diesel,
                color: "text-chart-3",
              },
              {
                name: "Diésel Premium",
                price: selectedStation.DieselPremium,
                color: "text-chart-4",
              },
              {
                name: "Diésel B",
                price: selectedStation.DieselB,
                color: "text-chart-5",
              },
              {
                name: "GLP",
                price: selectedStation.GLP_media,
                color: "text-primary",
              },
            ]
              .filter((item) => item.price)
              .map((item, index) => (
                <div
                  key={index}
                  className="bg-accent/5 border border-border/30 rounded-xl p-4 hover:bg-accent/10 transition-colors duration-300"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-sans font-medium text-foreground/90">
                      {item.name}
                    </span>
                    <span
                      className={`text-xl font-bold ${
                        item.price ? item.color : "text-muted-foreground/50"
                      }`}
                    >
                      {item.price ? `${item.price} €/L` : "—"}
                    </span>
                  </div>
                  {selectedStation.lastUpdate && (
                    <div className="mt-2 text-xs font-mono text-muted-foreground/70">
                      Actualizado:{" "}
                      {new Date(
                        selectedStation.lastUpdate
                      ).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
        {selectedStationHistoric?.data &&
          selectedStationHistoric.data.length > 0 && (
            <HistoricStation data={selectedStationHistoric.data} />
          )}
      </div>
    </MainLayout>
  );
};

export default StationDetailPage;
