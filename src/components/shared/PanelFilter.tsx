import { Popover, PopoverTrigger, PopoverContent, Slider } from "@heroui/react";
import { Funnel, Clock, Euro } from "lucide-react";
import { Button, Checkbox } from "@heroui/react";
import { useState } from "react";
import { FUEL_TYPES } from "../../hooks/useStations";

interface PanelFilterProps {
  fuelTypes: string[];
  selectedFuels: string[];
  onFuelFilterChange: (fuelType: string, isChecked: boolean) => void;
  onPriceRangeChange: (min: number | null, max: number | null) => void;
  onToggleRecentlyUpdated: (enabled: boolean) => void;
  onClearFilters: () => void;
  activeFilterCount: number;
  className?: string;
}

export default function PanelFilter({
  selectedFuels,
  onFuelFilterChange,
  onPriceRangeChange,
  onToggleRecentlyUpdated,
  onClearFilters,
  activeFilterCount,
  className,
}: PanelFilterProps) {
  const [recentlyUpdated, setRecentlyUpdated] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 3]);

  const handlePriceRangeChange = (value: number | number[]) => {
    const [min, max] = Array.isArray(value) ? value : [value, value];
    setPriceRange([min, max]);
    onPriceRangeChange(min === 1 ? null : min, max === 3 ? null : max);
  };

  const handleClearAllFilters = () => {
    setRecentlyUpdated(false);
    setPriceRange([1, 3]);
    onClearFilters();
  };

  const hasActiveFilters = selectedFuels.length > 0;

  return (
    <div className={className}>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Button
            className={`group flex items-center gap-2 px-4 py-2 rounded-full
            bg-card
            border ${
              hasActiveFilters ? "border-primary" : "border-sidebar-accent"
            }
            text-foreground hover:bg-sidebar-accent/50
            transition-all duration-200 shadow-sm relative
            hover:shadow-md hover:-translate-y-0.5`}
            size="md"
            variant="flat"
          >
            <Funnel className="h-4 w-4" />
            Filtros
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium font-sans bg-blue-900 text-blue-200">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0 bg-popover border-border shadow-lg">
          <div className="space-y-4 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-foreground">Filtros</h3>
              <button
                onClick={handleClearAllFilters}
                className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Limpiar todo
              </button>
            </div>
            <div className="border-t border-border pt-3">
              <h4 className="mb-3 text-xs font-medium text-foreground/80 uppercase tracking-wider">
                Tipo de combustible
              </h4>
              <div className="max-h-48 space-y-2 overflow-y-auto p-1">
                {FUEL_TYPES.map(({ key, label }) => (
                  <label
                    key={key}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-8">
                      <Checkbox
                        checked={selectedFuels.includes(key)}
                        onChange={(e) =>
                          onFuelFilterChange(key, e.target.checked)
                        }
                        className="h-4 w-4 rounded border-border text-primary focus:ring-primary/50"
                      />
                      <span className="text-sm text-foreground">{label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex items-center mb-3">
                <Euro className="h-3.5 w-3.5 text-foreground/80 mr-2" />
                <h4 className="text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  Rango de precios
                </h4>
              </div>
              <div className="px-1">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-xs font-medium text-foreground/80">
                    Rango seleccionado:
                  </div>
                  <div className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    {priceRange[0] === 1
                      ? "Mín"
                      : `€${priceRange[0].toFixed(2)}`}
                    {" - "}
                    {priceRange[1] === 3
                      ? "Máx"
                      : `€${priceRange[1].toFixed(2)}`}
                  </div>
                </div>
                <div className="px-2 py-3">
                  <Slider
                    value={priceRange}
                    onChange={handlePriceRangeChange}
                    minValue={1}
                    maxValue={3}
                    step={0.05}
                    formatOptions={{ style: "currency", currency: "EUR" }}
                    label="Rango de precios"
                    className="w-full [--slider-track-color:hsl(var(--primary)/0.3)] [--slider-track-fill:var(--primary)] [--slider-thumb-bg:var(--primary)]"
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1 px-1">
                  <span>€1.00</span>
                  <span>€3.00</span>
                </div>
              </div>
            </div>
            <div className="border-t border-border pt-3">
              <label className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/30 transition-colors cursor-pointer">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-foreground/70 mr-3" />
                  <span className="text-sm font-medium text-foreground">
                    Actualizado en 24h
                  </span>
                </div>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors">
                  <input
                    type="checkbox"
                    checked={recentlyUpdated}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setRecentlyUpdated(checked);
                      onToggleRecentlyUpdated(checked);
                    }}
                    className="peer sr-only"
                  />
                  <div
                    className={`h-6 w-11 rounded-full transition-colors ${
                      recentlyUpdated ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <div
                      className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-background shadow-sm transition-transform ${
                        recentlyUpdated ? "translate-x-5" : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
