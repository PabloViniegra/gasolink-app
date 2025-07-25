import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Heart, MapPin, Clock } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { Button } from '@heroui/react';
import { useFavorites } from '../hooks/useFavorites';
import '../styles/globals.css';

const FavoritePage: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, loadFavorites, removeFavourite } = useFavorites();

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

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
            {favorites.length} estaciones guardadas
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-card/50 border border-border rounded-xl p-8 text-center">
            <Heart className="w-12 h-12 mx-auto text-foreground/20 mb-4" />
            <h2 className="text-xl font-semibold text-foreground/80 mb-2">
              No hay estaciones favoritas
            </h2>
            <p className="text-foreground/60 mb-6">
              Añade estaciones a favoritos para verlas aquí
            </p>
            <Button
              color="primary"
              onPress={() => navigate('/')}
              className="font-sans"
            >
              Explorar estaciones
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((station) => (
              <div
                key={station.id}
                className="bg-card/50 border border-border rounded-xl p-6 hover:bg-accent/10 transition-colors duration-300 cursor-pointer"
                onClick={() => navigate(`/station/${station.id}`)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-foreground font-sans mb-1">
                      {station.nombreEstacion}
                    </h3>
                    <div className="flex items-center text-foreground/70 font-sans mb-3">
                      <MapPin size={14} className="mr-1.5" />
                      <p className="text-sm">
                        {station.direccion || 'Dirección no disponible'}
                      </p>
                    </div>
                  </div>
                  <Button
                    isIconOnly
                    variant="flat"
                    color="danger"
                    size="sm"
                    onPress={() => {
                      removeFavourite(station.id);
                    }}
                    className="text-danger hover:bg-danger/10"
                  >
                    <Heart size={16} fill="currentColor" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center text-sm">
                    <Clock size={14} className="mr-2 text-primary" />
                    <span className="text-foreground/70">
                      {station.horario || '24 horas'}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin size={14} className="mr-2 text-primary" />
                    <span className="text-foreground/70">
                      {station.localidad || 'No disponible'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default FavoritePage;