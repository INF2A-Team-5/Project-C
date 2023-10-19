import Button from "../foundations/button";
import React from 'react';
import data from "../../../test_data.json";

function Addtable() {
  var table = "<table>";

  table += `<tr>
                <th>Id</th>
                <th>Priority</th>
                <th>Client</th>
                <th>Date</th>
                <th>Status</th>
                <th> </th>
                </tr>`;

  var tr = "";
  for (let i = 0; i < data.length; i++) {
    tr += '<tr>';
    tr += `<td>${data[i].id}</td>`;
    tr += `<td>${data[i].priority}</td>`;
    tr += `<td>${data[i].client}</td>`;
    tr += `<td>${data[i].date}</td>`;
    tr += `<td>${data[i].status}</td>`;
    tr += `<td class="edit"><Button onClick={alert(${data[i].id})}>Edit</Button></td>`
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