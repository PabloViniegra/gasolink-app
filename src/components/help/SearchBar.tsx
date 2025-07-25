import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@heroui/react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  placeholder = 'Buscar...',
  className = '',
}) => {
  return (
    <div className={`w-full max-w-2xl mx-auto my-5 ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        variant="underlined"
        className="py-2 px-1 bg-card/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground/70 w-full"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        startContent={
          <Search className="size-5 text-muted-foreground pointer-events-none shrink-0" />
        }
      />
    </div>
  );
};

export default SearchBar;
