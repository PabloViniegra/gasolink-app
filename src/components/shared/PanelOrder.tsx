import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";
import { SortOption } from "../../hooks/useStations";
import { ArrowDownNarrowWide, ChevronDown, Check } from 'lucide-react';
import React from "react";

interface PanelOrderProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  className?: string;
}

export default function PanelOrder({
  sortOption,
  onSortChange,
  className = "",
}: PanelOrderProps) {
  const sortOptions = [
    { value: "name-asc" as const, label: "Nombre (A-Z)" },
    { value: "name-desc" as const, label: "Nombre (Z-A)" },
    { value: "price-asc" as const, label: "Precio (menor a mayor)" },
    { value: "price-desc" as const, label: "Precio (mayor a menor)" },
  ];

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sortOption)?.label || "Ordenar por";

  return (
    <div className={className}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="flat"
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-popover hover:bg-accent/50 hover:border-border/80 transition-all duration-200"
          >
            <ArrowDownNarrowWide className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              {currentSortLabel}
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-y-0.5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2 bg-popover border-border shadow-lg">
          <div className="space-y-1">
            <h3 className="px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Ordenar por
            </h3>
            <div className="space-y-0.5">
              {sortOptions.map((option) => {
                const isSelected = sortOption === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => onSortChange(option.value)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-between ${
                      isSelected 
                        ? 'text-primary bg-primary/10 font-medium' 
                        : 'text-foreground hover:bg-accent/50'
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
