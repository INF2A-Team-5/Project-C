import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  API_BASE_URL,
  getBaseQueryRequest,
  putBaseMutateRequest,
} from "@/lib/api";
import {
  getFilteredRowModel,
  ColumnFiltersState,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Separator } from "../ui/separator";
import { Input } from "@/components/ui/input";
import { Skeleton } from "../ui/skeleton";

interface TableProps<TData, TValue> {
  // data: { [key: string]: any }[];
  // displayColumns: string[];
  // dataColumns: string[];
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
}

function DataTable<TData, TValue>({
  data,
  columns,
}: TableProps<TData, TValue>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const totalPages = Math.ceil(data.length / 10);

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  let column = "";
  let columnplaceholder = "";
  if (table.getAllColumns().find((el) => el.id == "title") != undefined) {
    column = "title";
    columnplaceholder = "Title";
  } else if (table.getAllColumns().find((el) => el.id == "name") != undefined) {
    column = "name";
    columnplaceholder = "Name";
  } else if (
    table.getAllColumns().find((el) => el.id == "problemDescription") !=
    undefined
  ) {
    column = "problemDescription";
    columnplaceholder = "Problem Description";
  }
  return (
    <div className="grid gap-4">
      <div className="flex items-center">
        <Input
          placeholder={"Search for " + columnplaceholder + "..."}
          value={(table.getColumn(column)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(column)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <Card>
        <div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      cell.column.columnDef.id == "actions" || cell.renderValue() !== null ? (
                        <TableCell className="max-w-sm">
                          <div className="ml-4">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </div>
                        </TableCell>
                      ) : (
                        <TableCell className="max-w-sm">
                          <div className="ml-4 text-muted-foreground">
                            Unknown
                          </div>
                        </TableCell>
                      )
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  {/* <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                    >
                    No results.
                  </TableCell> */}
                  <Skeleton className="my-6 ml-4 h-4" />
                </TableRow>
              )}
              <Separator />
            </TableBody>
          </Table>
        </div>
        <footer className="flex items-center justify-between gap-4 p-4 ">
          <Button
            variant="outline"
            size="sm"
            onClick={function () {
              table.previousPage();
              setCurrentPage(currentPage - 1);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={function () {
              table.nextPage();
              setCurrentPage(currentPage + 1);
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </footer>
      </Card>
    </div>
  );
}

export default DataTable;
