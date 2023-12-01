import { useState } from "react";
import Settings from "../foundations/settings";
import { DataRow } from "../../services/DataRow";
import NewTable from "../foundations/newTable";
import { Button } from "../ui/button";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";

function Admin() {
  useAuthenticated();

  const [AllTickets, SetAllTickets] = useState<DataRow[]>([]);
  if (AllTickets.length == 0) {
    GetData();
  }

  async function GetData() {
    SetAllTickets(
      await fetch("http://localhost:5119/api/tickets/", {
        method: "GET",
        headers: {
          Authorization: "bearer " + localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      }).then((data) => data.json())
    );
  }

  return (
    <div className="text-center">
      <h1>Admin</h1>
      <Settings></Settings>
      <Button onClick={() => (window.location.href = "/add-account")}>
        Add account
      </Button>
      <h3></h3>
      <Button onClick={() => (window.location.href = "/add-machine")}>
        Add machine
      </Button>
      <h3></h3>
      <Button onClick={() => (window.location.href = "/add-department")}>
        Add department
      </Button>
      <h3></h3>
      <Button onClick={() => (window.location.href = "/add-solution")}>
        Add solution
      </Button>
      <NewTable
        displayColumns={["ID", "Priority", "Client", "Date", "Status", ""]}
        data={AllTickets}
        dataColumns={[
          "ticketId",
          "priority",
          "customer_Id",
          "date_Created",
          "status",
        ]}
      />
    </div>
  );
}

export default Admin;
