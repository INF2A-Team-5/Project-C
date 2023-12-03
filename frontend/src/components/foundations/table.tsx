import React from "react";
import ReactDOM from "react-dom";
import DataTable, { TableColumn } from "react-data-table-component";
import { ArrowDownIcon } from "@radix-ui/react-icons"
import Button from "./button";
import { useState } from 'react'


function handleButtonClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) {
    alert(id)
}

// type DataRow = {
//     ticketId: number,
//     machine_Id: number,
//     customer_Id: number,
//     assigned_Id: number,
//     priority: string,
//     status: string,
//     date_Created: string,
//     solution: string,
//     pictures: string,
//     phoneNumber: string,
//     notes: string;
// };

// const data = await fetch("http://localhost:5119/api/tickets/", 
// {
//   method: "GET",
//   headers: 
//   {
//     "Authorization": "bearer " + localStorage.getItem("Token"),
//     "Content-Type": "application/json",
//   }
// })
// .then(data => data.json());
// // .then(tickets => tickets.filter((client: any) => client.customer_Id == localStorage.getItem("Id")));

// const columns: TableColumn<DataRow>[] = [
//     {
//         name: "ID",
//         selector: row => row.ticketId,
//         sortable: true
//     },
//     {
//         name: "Priority",
//         selector: row => row.priority,
//         sortable: true
//     },
//     {
//         name: "Client",
//         selector: row => row.customer_Id,
//         sortable: true
//     },
//     {
//         name: "Date",
//         selector: row => row.date_Created,
//         sortable: true
//     },
//     {
//         name: "Status",
//         selector: row => row.status,
//         sortable: true
//     },
//     {
//         cell: (row) => <Button id={`${row.ticketId}`} onClick={(e) => handleButtonClick(e, row.ticketId)}>Edit</Button>,
//         ignoreRowClick: true,
//         allowOverflow: true,
//         button: true,
//     }
// ];

function Table() {

    const [Tickets, SetTickets] = useState<DataRow[]>([]);
    console.log(Tickets);
    if (Tickets.length == 0)
    {
        GetData();
    }
    type DataRow = {
        ticketId: number,
        machine_Id: number,
        customer_Id: number,
        assigned_Id: number,
        priority: string,
        status: string,
        date_Created: string,
        solution: string,
        files: string[],
        phoneNumber: string,
        notes: string;
    };
    
    async function GetData() 
    {
        SetTickets(await fetch("http://localhost:5119/api/tickets/", 
        {
        method: "GET",
        headers: 
        {
            "Authorization": "bearer " + localStorage.getItem("Token"),
            "Content-Type": "application/json",
        }
        })
        .then(data => data.json())
        .then(tickets => tickets.filter((client: any) => client.customer_Id == localStorage.getItem("Id"))));
    }

    const columns: TableColumn<DataRow>[] = [
        {
            name: "ID",
            selector: row => row.ticketId,
            sortable: true
        },
        {
            name: "Priority",
            selector: row => row.priority,
            sortable: true
        },
        {
            name: "Client",
            selector: row => row.customer_Id,
            sortable: true
        },
        {
            name: "Date",
            selector: row => row.date_Created,
            sortable: true
        },
        {
            name: "Status",
            selector: row => row.status,
            sortable: true
        },
        {
            cell: (row) => <Button id={`${row.ticketId}`} onClick={(e) => handleButtonClick(e, row.ticketId)}>Edit</Button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];
    return (
        <div>
            <div>
                <DataTable
                    columns={columns}
                    data={Tickets}
                    defaultSortFieldId="ID"
                    sortIcon={<ArrowDownIcon />}
                    pagination
                />
            </div>
        </div>
    )
}

export default Table;