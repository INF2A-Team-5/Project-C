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
                      <TableCell className="max-w-sm">
                        <div className="ml-4">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </div>
                      </TableCell>
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
                    <Skeleton className="h-4 ml-4 my-6"/>
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
