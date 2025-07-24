import MainLayout from "./layouts/MainLayout";
import Header from "./components/shared/Header";
import RegionSelector from "./components/region/RegionSelector";
import { useProvinces } from "./hooks/useProvinces";
import { useLocalities } from "./hooks/useLocalities";
import { useStations } from "./hooks/useStations";
import StationsPanel from "./components/stations/StationsPanel";
import PanelOrder from "./components/shared/PanelOrder";
import PanelFilter from "./components/shared/PanelFilter";

function App() {
  const { provinces, isLoading: isLoadingProvinces } = useProvinces();
  const { selectedLocalityId } = useLocalities();
  const {
    sortOption,
    setSortOption,
    stations,
    allStations,
    currentPage,
    totalPages,
    setCurrentPage,
    isLoading,
    error,
    availableFuelTypes,
    selectedFuels,
    onFuelFilterChange,
    onPriceRangeChange,
    onToggleRecentlyUpdated,
    onClearFilters,
    activeFilterCount,
    refetch,
  } = useStations(selectedLocalityId || 0);

  return (
    <MainLayout>
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <RegionSelector
            provinces={provinces}
            isLoadingProvinces={isLoadingProvinces}
          />
          <div className="flex flex-row items-center gap-2 sticky top-6 z-10 bg-transparent dark:bg-gray-900 py-2">
            <PanelFilter
              fuelTypes={availableFuelTypes}
              selectedFuels={selectedFuels}
              onFuelFilterChange={onFuelFilterChange}
              onPriceRangeChange={onPriceRangeChange}
              onToggleRecentlyUpdated={onToggleRecentlyUpdated}
              onClearFilters={onClearFilters}
              activeFilterCount={activeFilterCount}
            />
            <PanelOrder
              sortOption={sortOption}
              onSortChange={setSortOption}
            />
          </div>
        </div>
        <div className="mt-6">
          <StationsPanel
            stations={stations}
            allStations={allStations}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            isLoading={isLoading}
            error={error}
            refetch={refetch}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
