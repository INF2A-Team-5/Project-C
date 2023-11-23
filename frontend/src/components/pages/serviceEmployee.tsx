import Button from "../foundations/button";
import React, { useState } from 'react';
import Settings from '../foundations/settings'
import NewTable from '../foundations/newTable';

function serviceEmployee() {
  const [Tickets, SetTickets] = useState<DataRow[]>([]);
  console.log(Tickets);
  if (Tickets.length == 0) {
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

  async function GetData() {
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

  return (
    <div>
      <Settings></Settings>
      <h1>serviceEmployee</h1>
      <NewTable displayColumns={["ID", "Priority", "Client", "Date", "Status", ""]} data={Tickets} dataColumns={["ticketId", "priority", "customer_Id", "date_Created", "status"]} />
    </div>
  );
}

export default serviceEmployee;