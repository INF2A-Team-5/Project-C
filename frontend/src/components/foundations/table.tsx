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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
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
  getSortedRowModel
} from "@tanstack/react-table";

interface TableProps<TData, TValue> {
  // data: { [key: string]: any }[];
  // displayColumns: string[];
  // dataColumns: string[];
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
}

function DataTable<TData, TValue>({ data, columns }: TableProps<TData, TValue>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [sorting, setSorting] = useState<SortingState>([])

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
  })

  // const handleSort = (column: string) => {
  //   let temp = "";
  //   switch (column) {
  //     case "ID":
  //       temp = "ticketId";
  //       break;
  //     case "Priority":
  //       temp = "priority";
  //       break;
  //     case "Client":
  //       temp = "customer_Id";
  //       break;
  //     case "Date":
  //       temp = "date_Created";
  //       break;
  //     case "Status":
  //       temp = "status";
  //       break;
  //     default:
  //       temp = column;
  //       break;
  //   }

  //   if (sortDirection == "asc") {
  //     setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  //     sortByKey(data, temp);
  //   } else {
  //     setSortColumn(column);
  //     setSortDirection("asc");
  //     sortByKey(data, temp).reverse();
  //   }
  // };

  // function sortByKey<T>(array: T[], key: keyof T): T[] {
  //   return array.sort((a, b) =>
  //     a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0,
  //   );
  // }

  const indexOfLastItem = currentPage * 10;
  const indexOfFirstItem = indexOfLastItem - 10;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / 10);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  async function viewticket(id: number) {
    alert(id)
  }

  async function AssignTicket(ticket: any) {
    ticket.employee_Id = 1 // moet nog ff uitgezocht worden en pagina moet nu gereload worden iedere keer
    await fetch(
      "http://localhost:5119/api/tickets/" + ticket.ticketId,
      {
        method: "PUT",
        headers: {
          Authorization: "bearer " + localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticket),
      }
    );
    console.log(ticket);
    console.log("Assigned employee to ticket")
  }

  async function handleButtonClick(ticket: any) {
    const user = await fetch(
      API_BASE_URL +
      "/api/Accounts/" +
      localStorage.getItem("Id") +
      getBaseQueryRequest,
    ).then((data) => data.json());

    // const user = await fetch(`http://localhost:5119/api/Accounts/${localStorage.getItem("Id")}`, {
    //   method: "GET",
    //   headers:
    //   {
    //     "Content-Type": "application/json",
    //     "Authorization": "bearer " + localStorage.getItem("Token"),
    //   }
    // }).then((res) => res.json());

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
          API_BASE_URL + "/api/Tickets/" + temp.TicketId + putBaseMutateRequest,
          { body: JSON.stringify(temp) },
        );

        // await fetch("http://localhost:5119/api/Tickets/" + temp.TicketId,
        //   {
        //     method: "PUT",
        //     headers: {
        //       "Authorization": "bearer " + localStorage.getItem("Token"),
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(temp)
        //   });

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
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={function () {
            table.previousPage();
            setCurrentPage(
              currentPage - 1
            );
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
            setCurrentPage(
              currentPage + 1
            )
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
