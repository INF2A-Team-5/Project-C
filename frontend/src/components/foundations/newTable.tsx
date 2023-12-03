import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { useState } from "react";

interface TableProps {
    data: { [key: string]: any }[];
    displayColumns: string[];
    dataColumns: string[];
}

function NewTable({ data, displayColumns, dataColumns }: TableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const handleSort = (column: string) => {
        let temp;
        console.log(sortDirection);
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
            }
            else {
                alert("Tickets is allready assigned");
            }

            // Navigate to page were you can see ticket info
        }
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {displayColumns.map((column, index) => (
                            <th key={index} onClick={() => handleSort(column)}>
                                {column} {sortColumn === column && (sortDirection === 'asc' ? <ArrowDownIcon /> : <ArrowUpIcon />)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {dataColumns.map((column, columnIndex) => (
                                <td key={columnIndex}>{row[column]}</td>
                            ))}
                            <td>
                                <button onClick={() => handleButtonClick(row)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default NewTable;