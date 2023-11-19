import React from "react";
import ReactDOM from "react-dom";
import DataTable, { TableColumn } from "react-data-table-component";
import Card from "@material-ui/core/Card";
import { ArrowDownIcon } from "@radix-ui/react-icons"
import Settings from "./settings";
import Button from "./button";

function handleButtonClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) {
    alert(id)
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
    pictures: string,
    phoneNumber: string,
    notes: string;
};

const customer_Id = 1

const data = await fetch("http://localhost:5119/api/Tickets").then((res) => res.json());
// .then(tickets => tickets.filter((client: any) => client.customer_Id == customer_Id));

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

function Table() {
    return (
        <div>
            <Settings />
            <Card>
                <DataTable
                    columns={columns}
                    data={data}
                    defaultSortFieldId="ID"
                    sortIcon={<ArrowDownIcon />}
                    pagination
                />
            </Card>
        </div>
    )
}

export default Table;