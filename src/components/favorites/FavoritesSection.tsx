import React from "react";
import { useNavigate } from "react-router";
import { Heart, MapPin, Clock } from "lucide-react";
import { Button } from "@heroui/react";
import { Favorite } from "../../types";

interface FavoritesSectionProps {
  favorites: Favorite[];
  onRemoveFavorite: (id: string) => void;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  emptyStateActionText?: string;
  onEmptyStateAction?: () => void;
}

const FavoritesSection: React.FC<FavoritesSectionProps> = ({
  favorites,
  onRemoveFavorite,
  emptyStateTitle = "No hay estaciones favoritas",
  emptyStateDescription = "Añade estaciones a favoritos para verlas aquí",
  emptyStateActionText = "Explorar estaciones",
  onEmptyStateAction,
}) => {
  const navigate = useNavigate();

  const handleStationClick = (stationId: number) => {
    navigate(`/station/${stationId}`);
  };

  const handleEmptyStateAction = () => {
    if (onEmptyStateAction) {
      onEmptyStateAction();
    } else {
      navigate("/");
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="bg-card/50 border border-border rounded-xl p-8 text-center">
        <Heart className="w-12 h-12 mx-auto text-foreground/20 mb-4" />
        <h2 className="text-xl font-semibold text-foreground/80 mb-2">
          {emptyStateTitle}
        </h2>
        <p className="text-foreground/60 mb-6">{emptyStateDescription}</p>
        <Button
          color="primary"
          onPress={handleEmptyStateAction}
          className="font-sans"
        >
          {emptyStateActionText}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {favorites.map((station) => (
        <div
          key={station.id}
          className="bg-card/50 border border-border rounded-xl p-6 hover:bg-accent/10 transition-colors duration-300 cursor-pointer"
          onClick={() => handleStationClick(Number(station.id))}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-foreground font-sans mb-1">
                {station.nombreEstacion}
              </h3>
              <div className="flex items-center text-foreground/70 font-sans mb-3">
                <MapPin size={14} className="mr-1.5" />
                <p className="text-sm">
                  {station.direccion || "Dirección no disponible"}
                </p>
              </div>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              <Button
                isIconOnly
                variant="flat"
                color="danger"
                size="sm"
                onPress={() => onRemoveFavorite(station.id)}
                className="text-danger hover:bg-danger/10"
              >
                <Heart size={16} fill="currentColor" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center text-sm">
              <Clock size={14} className="mr-2 text-primary" />
              <span className="text-foreground/70">
                {station.horario || "24 horas"}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin size={14} className="mr-2 text-primary" />
              <span className="text-foreground/70">
                {station.localidad || "No disponible"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesSection;
