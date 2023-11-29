import { useState } from "react";
import Button from "../foundations/button";
import Settings from '../foundations/settings'
import { DataRow } from "../../services/DataRow";
import NewTable from "../foundations/newTable";

function Admin() {
  const [AllTickets, SetAllTickets] = useState<DataRow[]>([]);
  if (AllTickets.length == 0) {
    GetData();
  }

  async function GetData() {
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

  return (
    <div className="text-center">
      <h1>Admin</h1>
      <Settings></Settings>
      <Button hierarchy='xl' type="primary" onClick={() => window.location.href = '/add-account'} rounded="slight">Add account</Button>
      <h3></h3>
      <Button hierarchy='xl' type="primary" onClick={() => window.location.href = '/add-machine'} rounded="slight">Add machine</Button>
      <h3></h3>
      <Button hierarchy='xl' type="primary" onClick={() => window.location.href = '/add-department'} rounded="slight">Add department</Button>
      <h3></h3>
      <Button hierarchy='xl' type="primary" onClick={() => window.location.href = '/add-solution'} rounded="slight">Add solution</Button>
      <NewTable displayColumns={["ID", "Priority", "Client", "Date", "Status", ""]} data={AllTickets} dataColumns={["ticketId", "priority", "customer_Id", "date_Created", "status"]} />
    </div>
  );
}

export default Admin;