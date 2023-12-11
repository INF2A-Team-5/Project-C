import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DataRow } from "./DataRow";
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

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

export const ticketColumns: ColumnDef<DataRow>[] = [
  {
    accessorKey: "ticketId",
    header: "ID"
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "date_Created",
    header: "Date"
  },
  {
    accessorKey: "status",
    header: "Status"
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const ticket = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => alert(7)}>
              Show seven
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            {localStorage.getItem("Class") == "ServiceEmployee" || localStorage.getItem("Class") == "Admin" ?
              <DropdownMenuItem onClick={() => AssignTicket(ticket)}>Assign Ticket</DropdownMenuItem> : null
            }
            {/* <DropdownMenuItem onClick={() => viewticket(currentData.[findIndex(]rowIndex))}>View ticket </DropdownMenuItem> */}
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
]