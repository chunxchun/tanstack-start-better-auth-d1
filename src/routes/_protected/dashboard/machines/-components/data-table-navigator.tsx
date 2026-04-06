import { Button } from "@/components/ui/button";
import type { SelectMachineType } from "@/db/schema";

type DataTableNavigatorProps = {
  limit: number;
  offset: number;
  list: SelectMachineType[];
  updatePagination: (next: { limit: number; offset: number }) => void;
};

export default function DataTableNavigator({
  limit,
  offset,
  list,
  updatePagination,
}: DataTableNavigatorProps) {
  const currentPage = Math.floor(offset / limit) + 1;
  const hasPreviousPage = offset > 0;
  const hasNextPage = list.length === limit;

  const goToPreviousPage = () => {
    if (!hasPreviousPage) return;

    updatePagination({
      limit,
      offset: Math.max(0, offset - limit),
    });
  };

  const goToNextPage = () => {
    if (!hasNextPage) return;

    updatePagination({
      limit,
      offset: offset + limit,
    });
  };

  // const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
  //   const nextLimit = Number(event.target.value);

  //   updatePagination({
  //     limit: nextLimit,
  //     offset: 0,
  //   });
  // };

  return (
    <div className=" flex items-center justify-between gap-3">
      <div className="text-sm text-muted-foreground">Page {currentPage}</div>

      <div className="flex items-center gap-2">
        {/* <label
          className="text-sm text-muted-foreground"
          htmlFor="machine-page-size"
        >
          Rows
        </label>
        <select
          id="machine-page-size"
          className="h-9 rounded-md border bg-background px-2 text-sm"
          value={limit}
          onChange={handleLimitChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select> */}

        <Button
          type="button"
          variant="outline"
          onClick={goToPreviousPage}
          disabled={!hasPreviousPage}
        >
          Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={goToNextPage}
          disabled={!hasNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
