import { useNavigate, useParams } from "react-router";
import CurrentPrices from "../components/stations/CurrentPrices";
import { ArrowLeft } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import useStation from "../hooks/useStation";
import useGeolocation from "../hooks/useGeolocation";
import { useFavorites } from "../hooks/useFavorites";
import { Button, Skeleton } from "@heroui/react";
import HistoricStation from "../components/stations/HistoricStation";
import DetailStationHeader from "../components/stations/DetailStationHeader";

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
        <DetailStationHeader
          station={selectedStation}
          isFavorite={isFavorite}
          addFavorite={addFavorite}
          removeFavourite={removeFavourite}
          latitude={latitude}
          longitude={longitude}
        />
        <CurrentPrices
          prices={{
            Gasolina95: selectedStation.Gasolina95,
            Gasolina98: selectedStation.Gasolina98,
            Diesel: selectedStation.Diesel,
            DieselPremium: selectedStation.DieselPremium,
            DieselB: selectedStation.DieselB,
            GLP_media: selectedStation.GLP_media,
          }}
          lastUpdate={selectedStation.lastUpdate}
        />
        {selectedStationHistoric?.data &&
          selectedStationHistoric.data.length > 0 && (
            <HistoricStation data={selectedStationHistoric.data} />
          )}
      </div>
    </MainLayout>
  );
};

export default StationDetailPage;
