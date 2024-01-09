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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { CommandEmpty } from "cmdk";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { Cross2Icon } from "@radix-ui/react-icons";

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
  const [openStatus, setOpenStatus] = useState(false);
  const [openPriority, setOpenPriority] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const location = useLocation();

  const totalPages = Math.ceil(data.length / 10);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  async function viewticket(id: number) {
    alert(id);
  }

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

  async function handleButtonClick(ticket: any) {
    const user = await fetch(
      API_BASE_URL + "/api/Accounts/" + localStorage.getItem("Id"),
      getBaseQueryRequest(),
    ).then((data) => data.json());

    if (user.class == "Admin" || user.class == "ServiceEmployee") {
      if (ticket.employee_Id == null || ticket.employee_Id == 0) {
        const temp = {
          TicketId: ticket.ticketId,
          Machine_Id: ticket.machine_Id,
          Customer_Id: ticket.customer_Id,
          employee_Id: localStorage.getItem("Id"),
          Priority: ticket.priority,
          Status: ticket.status,

          Problem: ticket.problem,
          HaveTried: ticket.haveTried,
          MustBeDoing: ticket.mustBeDoing,
          Date_Created: ticket.date_Created,

          Solution: ticket.solution,
          PhoneNumber: ticket.phoneNumber,
          Notes: ticket.notes,
          files: ticket.files,
        };

        await fetch(
          API_BASE_URL + "/api/Tickets/" + temp.TicketId,
          putBaseMutateRequest(JSON.stringify(temp)),
        );

        localStorage.setItem("currentticket", ticket.ticketId.toString());
        window.location.href = "edit-ticket";
      } else {
        alert("Tickets is allready assigned");
      }

      // Navigate to page were you can see ticket info
    }
  }

  let column = "";
  let columnplaceholder = "";
  if (table.getAllColumns().find((el) => el.id == "title") != undefined) {
    column = "title";
    columnplaceholder = "Title";
  } else if (table.getAllColumns().find((el) => el.id == "name") != undefined) {
    column = "name";
    columnplaceholder = "Name";
  }

  const statuses = [
    {
      value: "open",
      label: "Open",
    },
    {
      value: "in process",
      label: "In Process",
    },
    {
      value: "closed",
      label: "Closed",
    },
  ];

  const priorities = [
    {
      value: "non critical",
      label: "Non Critical",
    },
    {
      value: "critical",
      label: "Critical",
    },
  ];


  return (
    <div className="grid gap-4">
      <div className="flex items-center">
        <Input
          placeholder={"Search for " + column + "..."}
          value={(table.getColumn(column)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(column)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {location.pathname === "/tickets" ?
          (<Popover open={openPriority} onOpenChange={setOpenPriority}>
            <div className="pl-5">
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openPriority}
                  className="w-[105px] justify-between "
                >
                  <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                  Priority
                </Button>
              </PopoverTrigger>
            </div>
            <PopoverContent className="w-[100px] p-0">
              <Command>
                <CommandGroup>
                  {priorities.map((priority) => (
                    <CommandItem
                      key={priority.label}
                      value={priority.value}
                      onSelect={(currentValue) => {
                        table
                          .getColumn("priority")
                          ?.setFilterValue(currentValue);
                        setOpenPriority(false);
                        setIsFiltered(true);
                      }}
                    >
                      {priority.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          ) : null}

        {location.pathname === "/tickets" ?
          (<Popover open={openStatus} onOpenChange={setOpenStatus}>
            <div className="pl-5">
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openStatus}
                  className="w-[100px] justify-between "
                >
                  <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                  Status
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
                        table
                          .getColumn("status")
                          ?.setFilterValue(currentValue);
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
              Reset
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
