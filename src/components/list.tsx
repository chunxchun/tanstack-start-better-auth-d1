import CreateShopDialog from "./shop/dialogs/CreateShopDialog";
import { Button } from "./ui/button";
import { DataTable } from "./user/dataTables/userDataTable";

export default function List({
  title,
  open,
  onOpenChange,
  onSubmit,
  onCancel,
  limit,
  offset,
  handleLimitChange,
  //   goToPreviousPage,
  hasPreviousPage,
  goToNextPage,
  hasNextPage,
  columns,
  data,
}: {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  limit: number;
  offset: number;
  handleLimitChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const navigate = useNavigate({ from: Route.fullPath });
  const updatePagination = (next: { limit: number; offset: number }) => {
    navigate({
      search: (prev: any) => ({
        ...prev,
        limit: next.limit,
        offset: next.offset,
      }),
    });
  };

  const goToPreviousPage = () => {
    if (!hasPreviousPage) return;

    updatePagination({
      limit,
      offset: Math.max(0, offset - limit),
    });
  };
  return (
    <div className="container mx-auto px-10 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <CreateShopDialog
          open={createOpen}
          onOpenChange={setCreateOpen}
          onSubmit={handleCreateSubmit}
          onCancel={() => setCreateOpen(false)}
        />
      </div>

      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground">Page {currentPage}</div>

        <div className="flex items-center gap-2">
          <label
            className="text-sm text-muted-foreground"
            htmlFor="shop-page-size"
          >
            Rows
          </label>
          <select
            id="shop-page-size"
            className="h-9 rounded-md border bg-background px-2 text-sm"
            value={limit}
            onChange={handleLimitChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>

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

      <DataTable columns={columns} data={data} />
    </div>
  );
}
