import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import { Button } from "@heroui/react";
import { useFavorites } from "../hooks/useFavorites";
import FavoritesSection from "../components/favorites/FavoritesSection";
import "../styles/globals.css";

const FavoritePage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    favorites, 
    isLoading, 
    error, 
    loadFavorites, 
    removeFavourite 
  } = useFavorites();

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const handleRetry = () => {
    loadFavorites();
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
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

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground font-sans mb-2">
            Estaciones favoritas
          </h1>
          <p className="text-foreground/70 font-sans">
            {isLoading ? 'Cargando...' : `${favorites.length} estaciones guardadas`}
          </p>
        </div>

        {isLoading && !error && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-foreground/70">Cargando estaciones favoritas...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="flex flex-col items-center">
              <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
              <h3 className="text-lg font-medium text-red-800 mb-2">
                Error al cargar los favoritos
              </h3>
              <p className="text-red-600 mb-4">
                {error.message || 'No se pudieron cargar las estaciones favoritas. Por favor, inténtalo de nuevo.'}
              </p>
              <Button
                color="danger"
                variant="flat"
                onPress={handleRetry}
                startContent={<ArrowLeft size={16} />}
              >
                Reintentar
              </Button>
            </div>
          </div>
        )}

        {!isLoading && !error && (
          <FavoritesSection
            favorites={favorites}
            onRemoveFavorite={removeFavourite}
            emptyStateTitle="No hay estaciones favoritas"
            emptyStateDescription="Añade estaciones a favoritos para verlas aquí"
            emptyStateActionText="Explorar estaciones"
            onEmptyStateAction={() => navigate('/')}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default FavoritePage;
