import Button from "../foundations/button";
import React from 'react';
import Settings from '../foundations/settings'

async function Addtable() {
  let Client = "1";
  let typeOfAccount = "Client";
  let tickets;
  var table = "<table>";

  if (typeOfAccount === "ServiceEmployee" || typeOfAccount == "Admin") {
    tickets = await fetch("http://localhost:5119/api/Tickets").then((res) => res.json());

    table += `<tr>
                <th>Id</th>
                <th>Priority</th>
                <th>Client</th>
                <th>Date</th>
                <th>Status</th>
                <th> </th>
                </tr>`;
  }
  else {
    tickets = await fetch("http://localhost:5119/api/Tickets/").then((res) => res.json())
      .then(tickets => tickets.filter((client: any) => client.custumer_Id == Client));

    table += `<tr>
      <th>Id</th>
      <th>Priority</th>
      <th>Date</th>
      <th>Status</th>
      <th> </th>
      </tr>`;
  }

  tickets.sort((a: { status: string; ticketId: number; }, b: { status: string; ticketId: number; }) => {
    if (a.status === b.status) {
      return a.ticketId - b.ticketId;
    }

    if (a.status === 'Open') {
      return -1;
    }
    if (b.status === 'Open') {
      return 1;
    }
    if (a.status === 'In Process') {
      return -1;
    }
    return 1;
  });

  console.log(tickets);
  console.log(tickets.length);


  var tr = "";
  for (let i = 0; i < tickets.length; i++) {
    tr += '<tr>';
    tr += `<td>${tickets[i].ticketId}</td>`;
    tr += `<td>${tickets[i].priority}</td>`;
    if (typeOfAccount == "ServiceEmployee" || typeOfAccount == "Admin") {
      tr += `<td>${tickets[i].custumer_Id}</td>`;
    }
    tr += `<td>${tickets[i].date_Created.slice(0, 10)}</td>`;
    tr += `<td>${tickets[i].status}</td>`;
    tr += `<td class="edit"><Button onClick={alert(${tickets[i].ticketId})}>Edit</Button></td>`
    tr += "<tr>";
  }

  table += tr + "</table>";

  document.body.innerHTML += table;
}


function Client() {
  window.onload = Addtable;
  return (
    <div>
      
      <Settings></Settings>
      <h1>Client</h1>
    </div>
  );
}

export default Client;