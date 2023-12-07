import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { Card } from "../ui/card";

interface TableProps {
  data: { [key: string]: any }[];
  displayColumns: string[];
  dataColumns: string[];
}

function DataTable({ data, displayColumns, dataColumns }: TableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: string) => {
    let temp;
    switch (column) {
      case "ID":
        temp = "ticketId";
        break;
      case "Priority":
        temp = "priority";
        break;
      case "Client":
        temp = "customer_Id";
        break;
      case "Date":
        temp = "date_Created"
        break;
      case "Status":
        temp = "status";
        break;
      default:
        temp = column;
        break;
    }

    if (sortDirection == "asc") {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      sortByKey(data, temp);
    } else {
      setSortColumn(column);
      setSortDirection('asc');
      sortByKey(data, temp).reverse();
    }
  };

  function sortByKey<T>(array: T[], key: keyof T): T[] {
    return array.sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0));
  }

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

  async function handleButtonClick(ticket: any) {
    const user = await fetch(`http://localhost:5119/api/Accounts/${localStorage.getItem("Id")}`, {
      method: "GET",
      headers:
      {
        "Content-Type": "application/json",
        "Authorization": "bearer " + localStorage.getItem("Token"),
      }
    }).then((res) => res.json());

    if (user.class == "Admin" || user.class == "ServiceEmployee") {
      if (ticket.assigned_Id == null || ticket.assigned_Id == 0) {
        const temp =
        {
          "TicketId": ticket.ticketId,
          "Machine_Id": ticket.machine_Id,
          "Customer_Id": ticket.customer_Id,
          "Assigned_Id": localStorage.getItem("Id"),
          "Priority": ticket.priority,
          "Status": ticket.status,

          "Problem": ticket.problem,
          "HaveTried": ticket.haveTried,
          "MustBeDoing": ticket.mustBeDoing,
          "Date_Created": ticket.date_Created,

          "Solution": ticket.solution,
          "PhoneNumber": ticket.phoneNumber,
          "Notes": ticket.notes,
          "files": ticket.files
        };

        await fetch("http://localhost:5119/api/Tickets/" + temp.TicketId,
          {
            method: "PUT",
            headers: {
              "Authorization": "bearer " + localStorage.getItem("Token"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify(temp)
          });

        localStorage.setItem("currentticket", ticket.ticketId.toString());
        window.location.href = "edit-ticket";
      }
      else {
        alert("Tickets is allready assigned");
      }

      // Navigate to page were you can see ticket info

    }
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            {displayColumns.map((column, index) => (
              <TableHead key={index} onClick={() => { column == "" ? null : handleSort(column) }}>
                {column} {sortColumn === column && (sortDirection === 'asc' ? <ArrowDownIcon /> : <ArrowUpIcon />)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {dataColumns.map((column, columnIndex) => (
                <TableCell key={columnIndex}>{row[column]}</TableCell>
              ))}
              <TableCell>
                {/* <button onClick={() => handleButtonClick(row)}>Edit</button> */}
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => alert(7)}
                      >
                        Show seven
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View customer</DropdownMenuItem>
                      {/* <DropdownMenuItem onClick={() => viewticket(currentData.findIndex(rowIndex))}>View ticket </DropdownMenuItem> */}
                      <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div>
        <Button className="m-4" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <Button
          className="m-4"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </Card>
  )
}

export default DataTable;