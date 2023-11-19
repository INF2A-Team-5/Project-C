import Button from "../foundations/button";
import React from 'react';
import Settings from '../foundations/settings'
import * as Dialog from '@radix-ui/react-dialog';
import {
  Cross1Icon,
} from '@radix-ui/react-icons';



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
    tickets = await fetch("http://localhost:5119/api/Tickets").then((res) => res.json())
      .then(tickets => tickets.filter((client: any) => client.customer_Id == Client));

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
  function toTicket() {
    window.location.href = window.location.href.replace("client", "tickets");
  }
  window.onload = Addtable;
  return (
    <div className="text-center">
      <Settings></Settings>
      <h1>Client</h1>
      <Dialog.Root>
        <Dialog.Trigger className="h-12 w-80 px-8 rounded-md font-medium text-base text-white bg-primary-400 hover:bg-primary-600 dark:text-dark-500 dark:bg-primary-500 dark:hover:bg-primary-700">test</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0  opacity-40 "/>
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 dark:bg-dark-400 bg-white
                                  border-2 border-[var(--border)] text-dark-400 dark:text-white rounded-md py-8 pl-16 w-2/5 shadow-sm">
            <Dialog.Title className="text-3xl font-medium dark:bg-dark-400 bg-white">Before you make a ticket, have you tried</Dialog.Title><br />
            <p className="text-lg text-dark-500 bg-white dark:text-white dark:bg-dark-400">Restarting the machine?</p>
            <p className="text-lg text-dark-500 bg-white dark:text-white dark:bg-dark-400">Checking if the sensors are blocked?</p>
            <p className="text-lg text-dark-500 bg-white dark:text-white dark:bg-dark-400">Checking for any stuck items?</p>
            <Dialog.Close className="fixed top-10 right-10 hover:text-grey-800">
              <Cross1Icon/>
            </Dialog.Close>
            <div className="flex justify-end pt-4 pr-10 bg-white dark:bg-dark-400">
              <Dialog.Close className="pr-6">
                <Button hierarchy="md" type="tertiary">No I haven't</Button>
              </Dialog.Close>
              <div>
                <Button hierarchy="md" type="primary" onClick={toTicket}>Yes I have</Button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>

      </Dialog.Root>
    </div>
  );
}

export default Client;