import { Card, CardBody, CardFooter, CardHeader, Chip, Link } from "@heroui/react";
import { Clock, MapPin, Fuel, AlertCircle, ChevronRight, CornerDownRight } from "lucide-react";
import { Station } from "../../types";
import { Link as RouterLink } from 'react-router';

interface StationCardProps {
  station: Station;
}

const formatPrice = (price: string | null) => {
  if (!price) return "N/A";
  return `${parseFloat(price).toFixed(3)} €`;
};

const getPriceColor = (price: string | null, average: string | null) => {
  if (!price || !average) return "default";
  const priceNum = parseFloat(price);
  const avgNum = parseFloat(average);

  if (priceNum < avgNum) return "success";
  if (priceNum > avgNum) return "danger";
  return "primary";
};

export default function StationCard({ station }: StationCardProps) {
  const fuelTypes = [
    {
      key: "Gasolina 95",
      icon: <Fuel size={14} className="text-blue-400" />,
      price: station.Gasolina95,
      avg: station.Gasolina95_media,
    },
    {
      key: "Gasolina 98",
      icon: <Fuel size={14} className="text-purple-400" />,
      price: station.Gasolina98,
      avg: station.Gasolina98_media,
    },
    {
      key: "Diésel",
      icon: <Fuel size={14} className="text-green-400" />,
      price: station.Diesel,
      avg: station.Diesel_media,
    },
    {
      key: "Diésel Premium",
      icon: <Fuel size={14} className="text-amber-400" />,
      price: station.DieselPremium,
      avg: station.DieselPremium_media,
    },
    {
      key: "GLP",
      icon: <Fuel size={14} className="text-red-400" />,
      price: station.GLP || station.GPL,
      avg: station.GLP_media || station.GPL_media,
    },
  ].filter((fuel) => fuel.price);

  return (
    <Card className="bg-card backdrop-blur-sm border border-border/50 rounded-xl shadow-lg w-full sm:w-11/12 md:w-4/5 hover:border-primary/50 transition-colors duration-200 flex flex-col min-h-[500px] max-h-[90vh] overflow-y-auto">
      <CardHeader className="p-4 sm:p-5 pb-3 flex-none">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-start w-full">
            <div className="pr-3">
              <h3 className="text-lg font-bold text-foreground font-display leading-tight">
                {station.nombreEstacion}
              </h3>
              {station.marca && (
                <p className="text-sm text-primary font-sans mt-1">
                  {station.marca}
                </p>
              )}
            </div>
            <div className="flex-shrink-0">
              {station.localidad && (
                <Chip
                  color="primary"
                  size="sm"
                  className="font-sans-serif font-medium whitespace-nowrap bg-primary/20 text-primary border border-primary/30"
                >
                  {station.localidad}
                </Chip>
              )}
            </div>
          </div>
          <div className="pt-2 border-t border-gray-800/50">
            <div className="flex items-start space-x-2">
              <MapPin
                size={16}
                className="flex-shrink-0 text-primary mt-0.5"
              />
              <span className="text-sm text-foreground/80 font-sans leading-relaxed">
                {station.direccion}
              </span>
            </div>
            {station.horario && (
              <div className="mt-3 pt-2 border-t border-border/30">
                <div className="flex items-start space-x-2">
                  <Clock
                    size={14}
                    className="flex-shrink-0 text-yellow-400 mt-0.5"
                  />
                  <div>
                    <p className="font-sans text-xs font-medium text-yellow-400 mb-1">
                      Horario
                    </p>
                    <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                      {station.horario}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardBody className="p-3 sm:p-4 pt-0">
        <div className="border-t border-border/50 my-3"></div>

        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-foreground font-display flex items-center">
            <Fuel size={16} className="font-sans text-primary mr-2" />
            Precios
          </h4>
          <span className="font-mono text-xs text-muted-foreground">
            {fuelTypes.length} tipos
          </span>
        </div>

        <div className="space-y-2.5">
          {fuelTypes.length > 0 ? (
            fuelTypes.map((fuel) => (
              <div
                key={fuel.key}
                className="group flex justify-between items-center w-full p-2 -mx-2 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="p-1.5 rounded-lg bg-accent/30 mr-3 group-hover:bg-accent/50 transition-colors">
                    {fuel.icon}
                  </div>
                  <span className="text-sm text-foreground font-sans-serif">
                    {fuel.key}
                  </span>
                </div>
                <div className="flex items-center">
                  <Chip
                    color={getPriceColor(fuel.price, fuel.avg)}
                    size="sm"
                    className="font-mono text-sm font-medium px-2.5 py-1"
                    title={`Media: ${
                      fuel.avg ? parseFloat(fuel.avg).toFixed(3) + " €" : "N/A"
                    }`}
                  >
                    {formatPrice(fuel.price)}
                  </Chip>
                  <ChevronRight
                    size={16}
                    className="ml-1.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center p-3 rounded-lg bg-warning/10 text-warning-foreground text-sm font-sans">
              <AlertCircle size={16} className="mr-2 flex-shrink-0" />
              <span>No hay precios disponibles actualmente</span>
            </div>
          )}
        </div>
      </CardBody>
      <CardFooter className="px-3 sm:px-4 py-3">
        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-3 border-t border-border/30">
            {station.lastUpdate && (
              <p className="text-[11px] text-muted-foreground/80 font-mono">
                Actualizado: {new Date(station.lastUpdate).toLocaleString()}
              </p>
            )}
            <Link>
              <RouterLink 
                to={`/station/${station.idEstacion}`} 
                className="group relative flex items-center text-sm text-muted-foreground hover:text-primary transition-all duration-300 ease-out -ml-1.5 px-1.5 py-1 -my-1 rounded-md hover:bg-accent/30"
              >
                <span className="relative inline-flex items-center">
                  <span className="mr-1.5 text-xs font-sans font-medium tracking-wide whitespace-nowrap">Ver detalles</span>
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent/20 group-hover:bg-primary/10 transition-colors duration-300">
                    <CornerDownRight 
                      size={12} 
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
                    />
                  </span>
                </span>
                <span className="absolute bottom-1 left-1.5 right-1.5 h-[1.5px] bg-primary/20 group-hover:bg-primary/40 transition-all duration-300"></span>
              </RouterLink>
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
