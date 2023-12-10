import { useState } from "react";
import Settings from "../foundations/settings";
import Table from "../foundations/table";
import { DataRow } from "../../services/DataRow";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";
import Header from "../foundations/header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Toaster } from "../ui/toaster";
import AddMachineSolution from "./AddMachineSolution";
import AddSolution from "./AddTicketSolution";
import AddMachine from "./addMachine";
import { Separator } from "../ui/separator";

function serviceEmployee() {
  useAuthenticated();
  const [AllTickets, SetAllTickets] = useState<DataRow[]>([]);
  const [AssignedTickets, SetAssignedTickets] = useState<DataRow[]>([]);
  const [Account, SetAccount] = useState();
  const [LoadTicket, SetTickets] = useState<Boolean>(false);


  if (LoadTicket == false)
  {
    GetAssignedData()
    GetAllData();
    SetTickets(true);
  }
  if (Account == undefined) {
    GetAccount();
  }

  async function GetAccount() {
    SetAccount(
      await fetch(
        "http://localhost:5119/api/accounts/" + localStorage.getItem("Id"),
        {
          method: "GET",
          headers: {
            Authorization: "bearer " + localStorage.getItem("Token"),
            "Content-Type": "application/json",
          },
        }
      ).then((data) => data.json())
    );
  }

  async function GetAllData() {
    SetAllTickets(
      await fetch(
        "http://localhost:5119/GetTicketByDepartment?AccountId=" +
          localStorage.getItem("Id"),
        {
          method: "GET",
          headers: {
            Authorization: "bearer " + localStorage.getItem("Token"),
            "Content-Type": "application/json",
          },
        }
      ).then((data) => data.json())
    );
  }

  async function GetAssignedData() {
    SetAssignedTickets(
      await fetch("http://localhost:5119/api/tickets/", {
        method: "GET",
        headers: {
          Authorization: "bearer " + localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      })
        .then((data) => data.json())
        .then((tickets) =>
          tickets.filter(
            (client: any) => client.assigned_Id == localStorage.getItem("Id")
          )
        )
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
          <h1 className="text-4xl font-medium">Serivce Employee</h1>
          <Separator className="my-4" />
          <Tabs defaultValue="tickets">
            <TabsList>
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
              <TabsTrigger value="machines">Machines</TabsTrigger>
            </TabsList>
            <TabsContent value="tickets">
              <Table
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
          </Tabs>
        </div>
        <div>
          <Tabs defaultValue="machine">
            <TabsList>
              <TabsTrigger value="machine">Add machine</TabsTrigger>
              <TabsTrigger value="ticket-solution">
                Add ticket solution
              </TabsTrigger>
              <TabsTrigger value="machine-solution">
                Add machine solution
              </TabsTrigger>
            </TabsList>
            <TabsContent value="machine">
              <Card className="w-3/6">
                <CardHeader>
                  <CardTitle>Add Machine</CardTitle>
                  <CardDescription>Create new machines</CardDescription>
                </CardHeader>
                <CardContent>
                  <AddMachine />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="ticket-solution">
              <Card className="w-3/6">
                <CardHeader>
                  <CardTitle>Add ticket solution</CardTitle>
                  <CardDescription>
                    Create solutions for frequent ticket problems
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AddSolution />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="machine-solution">
              <Card className="w-3/6">
                <CardHeader>
                  <CardTitle>Add machine solution</CardTitle>
                  <CardDescription>
                    Create solutions for frequent machine problems
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AddMachineSolution />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div className="h-44"></div>
      </div>
      <Toaster />
    </div>
  );
}

export default serviceEmployee;
