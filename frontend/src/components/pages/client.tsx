import Button from "../foundations/button";
import React from 'react';

async function Addtable() {
  let Client = "Client1";
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
    tickets = await fetch("http://localhost:5119/api/Tickets").then((res) => res.json())
      .then(tickets => tickets.filter((client: any) => client.client == Client));

    table += `<tr>
      <th>Id</th>
      <th>Priority</th>
      <th>Date</th>
      <th>Status</th>
      <th> </th>
      </tr>`;
  }

  console.log(tickets);
  console.log(tickets.length);


  var tr = "";
  for (let i = 0; i < tickets.length; i++) {
    tr += '<tr>';
    tr += `<td>${tickets[i].ticketId}</td>`;
    tr += `<td>${tickets[i].priority}</td>`;
    if (typeOfAccount == "ServiceEmployee" || typeOfAccount == "Admin") {
      tr += `<td>${tickets[i].client}</td>`;
    }
    tr += `<td>${tickets[i].date}</td>`;
    tr += `<td>${tickets[i].status}</td>`;
    tr += `<td class="edit"><Button onClick={alert(${tickets[i].id})}>Edit</Button></td>`
    tr += "<tr>";
  }

  table += tr + "</table>";

  document.body.innerHTML += table;
}


function Client() {
  window.onload = Addtable;
  return (
    <div>
      <h1>Client</h1>
      <Button>Refresh</Button>
    </div>
  );
}

export default Client;