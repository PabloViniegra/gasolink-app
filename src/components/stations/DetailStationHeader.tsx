import { Button } from "@heroui/react";
import { MapPin, Clock, Info, Navigation, Heart } from "lucide-react";
import { Tooltip } from "@heroui/react";
import { DetailStation, Favorite } from "../../types";

interface DetailStationHeaderProps {
  station: DetailStation;
  isFavorite: (id: string) => boolean;
  addFavorite: (station: Favorite) => void;
  removeFavourite: (id: string) => void;
  latitude: number | null;
  longitude: number | null;
}

const DetailStationHeader: React.FC<DetailStationHeaderProps> = ({
  station,
  isFavorite,
  addFavorite,
  removeFavourite,
  latitude,
  longitude,
}) => {
  return (
    <div className="bg-card/50 border border-border rounded-xl p-6 mb-8 backdrop-blur-sm relative">
      <div className="absolute top-6 right-6 flex gap-2">
        <Tooltip
          content={
            isFavorite(station?.idEstacion.toString())
              ? "Quitar de favoritos"
              : "Añadir a favoritos"
          }
        >
          <Button
            isIconOnly
            variant="flat"
            size="sm"
            className={`${
              isFavorite(station?.idEstacion.toString())
                ? "text-danger hover:bg-danger/10"
                : "text-foreground/60 hover:bg-accent/20 hover:text-foreground/80"
            } transition-colors`}
            onPress={() => {
              if (!station) return;

              const stationId = station.idEstacion.toString();
              if (isFavorite(stationId)) {
                removeFavourite(stationId);
              } else {
                const favorite: Favorite = {
                  id: stationId,
                  name: station.nombreEstacion,
                  nombreEstacion: station.nombreEstacion,
                  direccion: station.direccion || '',
                  localidad: station.localidad || '',
                  horario: station.horario || 'No especificado',
                  latitud: station.latitud,
                  longitud: station.longitud,
                  marca: station.marca || '',
                  provincia: station.provincia || ''
                };
                addFavorite(favorite);
              }
            }}
            isDisabled={!station}
          >
            <Heart
              size={18}
              fill={
                isFavorite(station?.idEstacion.toString())
                  ? "currentColor"
                  : "none"
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
              if (station?.latitud && station?.longitud) {
                const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${station.latitud},${station.longitud}&travelmode=driving`;
                window.open(url, "_blank");
              }
            }}
            isDisabled={
              !station?.latitud || !station?.longitud || !latitude || !longitude
            }
          >
            <Navigation size={18} />
          </Button>
        </Tooltip>
      </div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground font-sans mb-1">
          {station.nombreEstacion}
        </h1>
        <div className="flex items-center text-foreground/70 font-sans">
          <MapPin size={16} className="mr-1.5" />
          <p>{station.direccion || "Dirección no disponible"}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-accent/20 p-4 rounded-lg border border-border/50">
          <h3 className="font-sans font-semibold text-foreground/80 mb-1.5 flex items-center">
            <Clock size={16} className="mr-2 text-primary" />
            Horario
          </h3>
          <p className="font-lexend text-foreground/70">
            {station.horario || "24 horas"}
          </p>
        </div>
        <div className="bg-accent/20 p-4 rounded-lg border border-border/50">
          <h3 className="font-sans font-semibold text-foreground/80 mb-1.5 flex items-center">
            <MapPin size={16} className="mr-2 text-primary" />
            Municipio
          </h3>
          <p className="font-sans text-foreground/70">
            {station.localidad || "No disponible"}
          </p>
        </div>
        <div className="bg-accent/20 p-4 rounded-lg border border-border/50">
          <h3 className="font-sans font-semibold text-foreground/80 mb-1.5 flex items-center">
            <Info size={16} className="mr-2 text-primary" />
            Estado
          </h3>
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            <span className="font-sans text-foreground/70">Abierto ahora</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailStationHeader;
