import Button from "../foundations/button";
import React, { useState } from 'react';
import Settings from '../foundations/settings'
import NewTable from '../foundations/newTable';

function serviceEmployee() {
  const [AllTickets, SetAllTickets] = useState<DataRow[]>([]);
  const [AssignedTickets, SetAssignedTickets] = useState<DataRow[]>([]);
  console.log(AllTickets);
  if (AllTickets.length == 0) {
    GetAllData();
  }
  if (AssignedTickets.length == 0) {
    GetAssignedData();
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

  async function GetAllData() {
    SetAllTickets(await fetch("http://localhost:5119/api/tickets/",
      {
        method: "GET",
        headers:
        {
          "Authorization": "bearer " + localStorage.getItem("Token"),
          "Content-Type": "application/json",
        }
      })
      .then(data => data.json()))
  }

  async function GetAssignedData() {
    SetAssignedTickets(await fetch("http://localhost:5119/api/tickets/",
      {
        method: "GET",
        headers:
        {
          "Authorization": "bearer " + localStorage.getItem("Token"),
          "Content-Type": "application/json",
        }
      })
      .then(data => data.json())
      .then(tickets => tickets.filter((client: any) => client.assigned_Id == localStorage.getItem("Id"))));
  }

  return (
    <div>
      <Settings></Settings>
      <h1>serviceEmployee</h1>
      <NewTable displayColumns={["ID", "Priority", "Client", "Date", "Status", ""]} data={AllTickets} dataColumns={["ticketId", "priority", "customer_Id", "date_Created", "status"]} />
      <h1>Assigned Tickets</h1>
      <NewTable displayColumns={["ID", "Priority", "Client", "Date", "Status", ""]} data={AssignedTickets} dataColumns={["ticketId", "priority", "customer_Id", "date_Created", "status"]} />
    </div>
  );
}

export default serviceEmployee;