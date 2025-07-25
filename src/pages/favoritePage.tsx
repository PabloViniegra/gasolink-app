import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { Button } from '@heroui/react';
import { useFavorites } from '../hooks/useFavorites';
import FavoritesSection from '../components/favorites/FavoritesSection';
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

        <FavoritesSection
          favorites={favorites}
          onRemoveFavorite={removeFavourite}
        />
      </div>
    </MainLayout>
  );
};

export default FavoritePage;