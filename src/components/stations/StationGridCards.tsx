import { useNavigate } from "react-router";
import { Card, CardBody, CardFooter, Chip } from "@heroui/react";
import { ArrowRight, MapPin, Bookmark } from "lucide-react";
import { Button } from "@heroui/react";
import { NearStation } from "../../types";
import { useState, useEffect } from "react";
import CustomPagination from "../shared/CustomPagination";

interface StationGridCardsProps {
  stations: NearStation[];
  onStationClick?: (stationId: number) => void;
  itemsPerPage?: number;
  showPagination?: boolean;
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

const ITEMS_PER_PAGE = 6;

const StationGridCards: React.FC<StationGridCardsProps> = ({
  stations = [],
  onStationClick,
  itemsPerPage = ITEMS_PER_PAGE,
  showPagination = true,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginatedStations, setPaginatedStations] = useState<NearStation[]>([]);

  useEffect(() => {
    const totalPagesCount = Math.ceil(stations.length / itemsPerPage);
    setTotalPages(totalPagesCount);
    if (currentPage > totalPagesCount && totalPagesCount > 0) {
      setCurrentPage(1);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedStations(stations.slice(startIndex, endIndex));
  }, [stations, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full mb-4">
        {paginatedStations.map((station) => (
          <Card
            key={station.idEstacion}
            className="w-full h-full bg-card/50 hover:bg-card/70 transition-all duration-200 border border-border/30 hover:border-primary/30 shadow-sm hover:shadow-lg overflow-hidden flex flex-col break-words min-w-0 max-w-full"
          >
            <CardBody className="p-3 sm:p-4 flex-1 flex flex-col w-full overflow-x-hidden">
              <div className="flex justify-between items-start w-full gap-2 overflow-hidden">
                <div>
                  <h3 className="font-semibold text-lg font-lexend text-foreground hover:text-primary transition-colors break-words overflow-hidden text-ellipsis whitespace-nowrap max-w-[180px] sm:max-w-[200px] md:max-w-full">
                    {station.nombreEstacion}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground/80 mt-1 w-full overflow-hidden">
                    <MapPin size={14} className="mr-1 flex-shrink-0" />
                    <span className="truncate block max-w-full">
                      {station.direccion}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center w-full">
                    <Chip
                      variant="shadow"
                      color="default"
                      className="max-w-full"
                    >
                      <span className="flex items-center font-medium text-sm">
                        <Bookmark size={14} className="mr-1 flex-shrink-0" />
                        {station.distancia !== undefined &&
                          formatDistance(station.distancia)}
                      </span>
                    </Chip>
                  </div>
                </div>
                <div className="bg-primary/10 hover:bg-primary/20 text-primary text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap transition-colors shrink-0">
                  {getLowestPrice(station)} €/L
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border/30 w-full overflow-hidden">
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs sm:text-sm w-full min-w-0 [&>div]:truncate">
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
            <CardFooter className="pt-0 px-3 sm:px-4 pb-2 sm:pb-3">
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
      {showPagination && totalPages > 1 && (
        <div className="mt-6">
          <CustomPagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default StationGridCards;
