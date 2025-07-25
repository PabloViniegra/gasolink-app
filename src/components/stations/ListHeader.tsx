import { Select, SelectItem } from "@heroui/react";
import { ArrowUpDown, ChevronDown } from "lucide-react";

interface ListHeaderProps {
  SORT_OPTIONS: { key: string; label: string }[];
  stationCount: number;
  selectedSort: Set<string>;
  onSortChange: (keys: Set<string>) => void;
}

const ListHeader: React.FC<ListHeaderProps> = ({
  SORT_OPTIONS,
  stationCount,
  selectedSort,
  onSortChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold font-display text-foreground">
          Estaciones cercanas
        </h1>
        <p className="text-muted-foreground mt-1 font-lexend">
          {stationCount} estaciones encontradas
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-sans text-sm text-muted-foreground whitespace-nowrap">
          Ordenar por:
        </span>
        <Select
          selectedKeys={selectedSort}
          onSelectionChange={(keys) =>
            onSortChange(new Set(Array.from(keys as Set<string>)))
          }
          defaultSelectedKeys={new Set(["distance-asc"])}
          size="sm"
          variant="faded"
          className="min-w-[180px] text-muted"
          startContent={<ArrowUpDown size={16} className="text-muted" />}
          selectorIcon={<ChevronDown size={16} />}
        >
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default ListHeader;
