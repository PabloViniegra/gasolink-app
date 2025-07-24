import {
  Select,
  SelectItem as HeroUISelectItem,
  type Selection,
} from "@heroui/react";
import { SelectItem as SelectItemProps } from "../../types";

interface Props {
  items: SelectItemProps[];
  label: string;
  value: string;
  size: "lg" | "sm" | "md";
  className?: string;
  onSelectionChange?: (value: number) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export function SelectComponent({
  items,
  label,
  value,
  size,
  className,
  onSelectionChange,
  isDisabled = false,
  isLoading = false,
}: Props) {
  const handleSelectionChange = (keys: Selection) => {
    if (!onSelectionChange) return;
    const selectedKey = Array.from(keys as Set<string>)[0] || "";
    onSelectionChange(parseInt(selectedKey));
  };

  return (
    <Select
      selectedKeys={value ? new Set([value]) : new Set()}
      onSelectionChange={handleSelectionChange}
      label={label}
      size={size}
      className={className}
      variant="flat"
      isDisabled={isDisabled}
      isLoading={isLoading}
      radius="full"
    >
      {items.map((item) => (
        <HeroUISelectItem key={item.key}>{item.label}</HeroUISelectItem>
      ))}
    </Select>
  );
}
