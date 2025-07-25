import { useNavigate } from "react-router";
import { Card, CardBody, CardFooter, Chip } from "@heroui/react";
import { ArrowRight, MapPin, Bookmark } from "lucide-react";
import { Button } from "@heroui/react";
import { NearStation } from "../../types";

interface StationGridCardsProps {
  stations: NearStation[];
  onStationClick?: (stationId: number) => void;
}

const formatDistance = (distance: number) => {
  return distance < 1
    ? `${Math.round(distance * 1000)} m`
    : `${distance.toFixed(1)} km`;
};

const getLowestPrice = (station: NearStation) => {
  const prices = [
    parseFloat(String(station.Gasolina95 || 0)) || Infinity,
    parseFloat(String(station.Diesel || 0)) || Infinity,
  ];
  const minPrice = Math.min(...prices);
  return minPrice !== Infinity ? minPrice.toFixed(3) : "N/A";
};

const StationGridCards: React.FC<StationGridCardsProps> = ({
  stations = [],
  onStationClick,
}) => {
  const navigate = useNavigate();

  const handleStationClick = (stationId: number) => {
    if (onStationClick) {
      onStationClick(stationId);
    } else {
      navigate(`/station/${stationId}`);
    }
  };

  if (!stations.length) {
    return (
      <div className="w-full text-center py-8 text-muted-foreground">
        No se encontraron estaciones
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {stations.map((station) => (
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
                  <span className="truncate max-w-[180px] md:max-w-[200px] lg:max-w-[220px]">
                    {station.direccion}
                  </span>
                </div>
                <div className="mt-3 flex items-center">
                  <Chip variant="shadow" color="default">
                    <span className="flex items-center font-medium text-sm">
                      <Bookmark size={14} className="mr-1 flex-shrink-0" />
                      {station.distancia !== undefined &&
                        formatDistance(station.distancia)}
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
                    ? `${parseFloat(String(station.Gasolina95)).toFixed(3)} €`
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
                    <div className="text-muted-foreground/80">Gasolina 95:</div>
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
              onPress={() => handleStationClick(station.idEstacion)}
              endContent={<ArrowRight size={16} />}
            >
              Ver detalles
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default StationGridCards;
