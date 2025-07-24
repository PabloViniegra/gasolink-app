import { Pagination } from "@heroui/react";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function CustomPagination({
  page,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <Pagination
        showControls
        showShadow
        initialPage={1}
        total={totalPages}
        onChange={onPageChange}
        page={page}
        variant="flat"
        color="primary"
        classNames={{
          item: "bg-gray-700 text-white font-sans hover:bg-gray-800",
          next: "bg-gray-700 text-white font-sans hover:bg-gray-800",
          prev: "bg-gray-700 text-white font-sans hover:bg-gray-800",
        }}
      />
    </div>
  );
}
