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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandGroup, CommandItem } from "../ui/command";
import { useLocation } from "react-router-dom";
import { CaretSortIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";

interface TableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
}

function DataTable<TData, TValue>({
  data,
  columns,
}: TableProps<TData, TValue>) {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [openStatus, setOpenStatus] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [value, setValue] = useState("");
  const location = useLocation();
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
    columnplaceholder = t("table.title");
  } else if (table.getAllColumns().find((el) => el.id == "name") != undefined) {
    column = "name";
    columnplaceholder = t("table.name");
  } else if (
    table.getAllColumns().find((el) => el.id == "problemDescription") !=
    undefined
  ) {
    column = "problemDescription";
    columnplaceholder = t("table.problemdescription");
  }
  //  else if (
  //   table.getAllColumns().find((el) => el.id == "employeeId") != undefined) {
  //     column = "employeeID"
  //   }

  const statuses = [
    {
      value: "open",
      label: t("table.open"),
    },
    {
      value: "in process",
      label: t("table.inprocess"),
    },
    {
      value: "closed",
      label: t("table.closed"),
    },
  ];
  return (
    <div className="grid gap-4">
      <div className="flex items-center">
        {column != "" ? (
          <Input
            placeholder={t("table.searchfor") + columnplaceholder + "..."}
            value={(table.getColumn(column)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(column)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : null}
        {location.pathname === "/tickets" ||
        location.pathname === "/assigned-tickets" ? (
          <Popover open={openStatus} onOpenChange={setOpenStatus}>
            <div className="pl-5">
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openStatus}
                  className="w-min justify-between "
                >
                  {value
                    ? statuses.find((status) => status.value === value)?.label
                    : t("table.status")}
                  <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
            </div>
            <PopoverContent className="w-[100px] p-0">
              <Command>
                <CommandGroup>
                  {statuses.map((status) => (
                    <CommandItem
                      key={status.label}
                      value={status.value}
                      onSelect={(currentValue) => {
                        table.getColumn("status")?.setFilterValue(currentValue);
                        setValue(currentValue === value ? "" : currentValue);
                        setOpenStatus(false);
                        setIsFiltered(true);
                      }}
                    >
                      {status.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        ) : null}
        {isFiltered ? (
          <div className="pl-3">
            <Button
              variant="ghost"
              onClick={() => {
                table.resetColumnFilters();
                setIsFiltered(false);
              }}
              className=""
            >
              {t("table.reset")}
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : null}
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
                    {row.getVisibleCells().map((cell) =>
                      cell.column.columnDef.id == "actions" ||
                      cell.renderValue() !== null ? (
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
                            {t("table.unknown")}
                          </div>
                        </TableCell>
                      ),
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
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
            {t("table.previous")}
          </Button>
          <span>{`${t("table.page")} ${currentPage} ${t(
            "table.of",
          )} ${totalPages}`}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={function () {
              table.nextPage();
              setCurrentPage(currentPage + 1);
            }}
            disabled={!table.getCanNextPage()}
          >
            {t("table.next")}
          </Button>
        </footer>
      </Card>
    </div>
  );
}

export default DataTable;
