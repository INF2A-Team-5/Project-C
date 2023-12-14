import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
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
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Separator } from "../ui/separator";

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

  const totalPages = Math.ceil(data.length / 10);

  // const handlePageChange = (newPage: number) => {
  //   setCurrentPage(newPage);
  // };

  // async function viewticket(id: number) {
  //   alert(id)
  // }

  // async function AssignTicket(ticket: any)
  // {
  //   ticket.employee_Id = await fetch("http://localhost:5119/GetEmployeeById/" + localStorage.getItem("Id"), getBaseQueryRequest()).then((data) => data.json()); // moet nog ff uitgezocht worden en pagina moet nu gereload worden iedere keer
    
  //   await fetch(
  //     "http://localhost:5119/api/tickets/" + ticket.ticketId,
  //     {
  //       method: "PUT",
  //       headers: {
  //         Authorization: "bearer " + localStorage.getItem("Token"),
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(ticket),
  //     }
  //   );
  //   console.log(ticket);
  //   console.log("Assigned employee to ticket")
  // }
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  async function handleButtonClick(ticket: any) {
    const user = await fetch(
      API_BASE_URL + "/api/Accounts/" + localStorage.getItem("Id"),
      getBaseQueryRequest(),
    ).then((data) => data.json());

    if (user.class == "Admin" || user.class == "ServiceEmployee") {
      if (ticket.assigned_Id == null || ticket.assigned_Id == 0) {
        const temp = {
          TicketId: ticket.ticketId,
          Machine_Id: ticket.machine_Id,
          Customer_Id: ticket.customer_Id,
          Assigned_Id: localStorage.getItem("Id"),
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

  return (
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
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
            <Separator />
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 pr-8">
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
          className="m-4"
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
      </div>
    </Card>
  );
}

export default DataTable;
