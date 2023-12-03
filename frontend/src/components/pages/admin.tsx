import { useState } from "react";
import Settings from "../foundations/settings";
import { DataRow } from "../../services/DataRow";
import NewTable from "../foundations/newTable";
import { Button } from "../ui/button";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "@radix-ui/react-dropdown-menu";
import Header from "../foundations/header";
import AddAccount from "./addAccount";
import AddMachine from "./addMachine";
import AddDepartment from "./addDepartment";
import AddSolution from "./AddSolution";

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
    <div className="text-left px-24">
      <Settings></Settings>
      <div className="flex justify-center pb-16 pt-10">
        <Header></Header>
      </div>
      <div className="grid gap-12">
        <div>
          <h1 className="text-4xl font-medium">Admin</h1>

          <Label>View all tables</Label>
          <Tabs defaultValue="accounts">
            <TabsList>
              <TabsTrigger value="accounts">Accounts</TabsTrigger>
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
              <TabsTrigger value="machines">Machines</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
            </TabsList>
            <TabsContent value="accounts">
              Pleur hier je accounttabel
            </TabsContent>
            <TabsContent value="tickets">
              <NewTable
                displayColumns={[
                  "ID",
                  "Priority",
                  "Client",
                  "Date",
                  "Status",
                  "",
                ]}
                data={AllTickets}
                dataColumns={[
                  "ticketId",
                  "priority",
                  "customer_Id",
                  "date_Created",
                  "status",
                ]}
              />
            </TabsContent>
            <TabsContent value="machines">
              Pleur hier je machinestabel
            </TabsContent>
            <TabsContent value="departments">
              Pleur hier je departmentstabel
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Add account</TabsTrigger>
              <TabsTrigger value="machine">Add machine</TabsTrigger>
              <TabsTrigger value="department">Add department</TabsTrigger>
              <TabsTrigger value="solution">Add solution</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <AddAccount />
            </TabsContent>
            <TabsContent value="machine">
              <AddMachine />
            </TabsContent>
            <TabsContent value="department">
              <AddDepartment />
            </TabsContent>
            <TabsContent value="solution">
              <AddSolution />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Admin;
