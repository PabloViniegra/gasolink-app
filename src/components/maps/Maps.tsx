import "maplibre-gl/dist/maplibre-gl.css";
import "maplibre-theme/icons.default.css";
import "maplibre-theme/modern.css";
import "maplibre-react-components/style.css";
import {
  RMap,
  RMarker,
  RNavigationControl,
  RGradientMarker,
  RPopup,
} from "maplibre-react-components";
import {
  Select,
  SelectItem,
  type Selection,
  Spinner,
  Button,
  Tooltip,
} from "@heroui/react";
import useGeolocation from "../../hooks/useGeolocation";
import useNearestStations from "../../hooks/useNearestStations";
import { Coords } from "../../types";
import { useState, useEffect } from "react";
import { Copy, Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import "./Maps.css";

const RADIUS_OPTIONS = [
  { key: "10", label: "10 km" },
  { key: "20", label: "20 km" },
  { key: "50", label: "50 km" },
] as const;

export default function Maps() {
  const [selectedStation, setSelectedStation] = useState<number | null>(null);
  const [selectedRadius, setSelectedRadius] = useState<Selection>(
    new Set(["20"])
  );
  const [copiedStationId, setCopiedStationId] = useState<number | null>(null);
  const navigate = useNavigate();
  const { latitude, longitude } = useGeolocation();
  const {
    closeStations,
    setLatitud,
    setLongitud,
    setRadio,
    queryNearestStations,
  } = useNearestStations();

  const myLocation: Coords = [longitude!, latitude!];

  useEffect(() => {
    if (latitude && longitude) {
      setLatitud(latitude);
      setLongitud(longitude);
    }
  }, [latitude, longitude, setLatitud, setLongitud]);

  useEffect(() => {
    const radiusValue = Array.from(selectedRadius)[0];
    if (radiusValue) {
      setRadio(parseInt(radiusValue.toString(), 10));
    }
  }, [selectedRadius, setRadio]);

  const handleMarkerClick = (stationId: number) => {
    setSelectedStation(stationId === selectedStation ? null : stationId);
  };

  const handleClosePopup = () => {
    setSelectedStation(null);
    setCopiedStationId(null);
  };

  const copyToClipboard = (text: string, stationId: number) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedStationId(stationId);
        setTimeout(() => {
          if (copiedStationId === stationId) {
            setCopiedStationId(null);
          }
        }, 2000);
      })
      .catch((err) => {
        console.error("Error al copiar la dirección:", err);
      });
  };

  if (!latitude || !longitude || queryNearestStations.isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-background">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <RMap
      minZoom={6}
      initialCenter={myLocation}
      initialZoom={12}
      mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
      style={{ width: "100%", height: "100%" }}
      onClick={handleClosePopup}
    >
      <div className="absolute top-4 right-4 z-10 bg-transparent rounded-lg shadow-lg p-2">
        <Select
          selectedKeys={selectedRadius}
          onSelectionChange={setSelectedRadius}
          size="sm"
          variant="faded"
          className="w-32"
          radius="full"
        >
          {RADIUS_OPTIONS.map((radius) => (
            <SelectItem key={radius.key}>{radius.label}</SelectItem>
          ))}
        </Select>
      </div>
      <RNavigationControl position="top-left" visualizePitch={true} />
      <RGradientMarker
        longitude={myLocation[0]}
        latitude={myLocation[1]}
        color="#3b82f6"
      />
      {closeStations.map((station) => (
        <div key={station.idEstacion}>
          <RMarker
            longitude={station.longitud}
            latitude={station.latitud}
            onClick={(e) => {
              e.stopPropagation();
              handleMarkerClick(station.idEstacion);
            }}
          />

          {selectedStation === station.idEstacion && (
            <RPopup
              longitude={station.longitud}
              latitude={station.latitud}
              offset={[0, -30] as [number, number]}
              className="font-lexend"
            >
              <div className="p-3 min-w-[240px] bg-popover text-popover-foreground rounded-[var(--radius)] shadow-[var(--shadow)]">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-lexend font-semibold text-base leading-tight">
                    {station.nombreEstacion}
                  </h3>
                  <button
                    onClick={handleClosePopup}
                    className="text-muted-foreground hover:text-foreground transition-colors font-sans-serif"
                    aria-label="Cerrar"
                  >
                    ×
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between gap-1 group">
                    <p className="text-foreground/90">{station.direccion}</p>
                    <Tooltip
                      content={
                        copiedStationId === station.idEstacion
                          ? "¡Copiado!"
                          : "Copiar dirección"
                      }
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        isIconOnly
                        className="w-5 h-5 min-w-5 p-0 m-0 bg-muted text-muted-foreground border-0"
                        onPress={() => {
                          copyToClipboard(
                            station.direccion || "",
                            station.idEstacion
                          );
                        }}
                      >
                        {copiedStationId === station.idEstacion ? (
                          <Check className="h-3.5 w-3.5 text-green-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    </Tooltip>
                  </div>
                  <p className="text-foreground/80">{station.localidad}</p>
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="font-medium text-foreground mb-2">Precios:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-foreground/80">Gasolina 95:</span>
                      <span className="text-right font-medium text-primary">
                        {station.Gasolina95?.toFixed(3) || "N/A"} €
                      </span>
                      <span className="text-foreground/80">Diésel:</span>
                      <span className="text-right font-medium text-primary">
                        {station.Diesel?.toFixed(3) || "N/A"} €
                      </span>
                    </div>
                    <div className="mt-3 -mx-3 -mb-3">
                      <Button
                        fullWidth
                        variant="light"
                        color="primary"
                        size="sm"
                        radius="none"
                        className="rounded-b-[var(--radius)] justify-center gap-2 py-2 h-auto bg-border text-foreground font-sans-serif"
                        onPress={() => navigate(`/station/${station.idEstacion}`)}
                        endContent={<ArrowRight size={16} />}
                      >
                        Ver detalles de la estación
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </RPopup>
          )}
        </div>
      ))}
    </RMap>
  );
}
