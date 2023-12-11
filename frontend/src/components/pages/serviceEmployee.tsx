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
import { API_BASE_URL, getBaseQueryRequest } from "@/lib/api";

function serviceEmployee() {
  useAuthenticated();
  const [AllTickets, SetAllTickets] = useState<DataRow[]>([]);
  const [AssignedTickets, SetAssignedTickets] = useState<DataRow[]>([]);
  const [Account, SetAccount] = useState();
  const [LoadTicket, SetTickets] = useState<Boolean>(false);

  if (LoadTicket == false) {
    GetAssignedData();
    GetAllData();
    SetTickets(true);
  }
  if (Account == undefined) {
    GetAccount();
  }

  async function GetAccount() {
    SetAccount(
      await fetch(
        API_BASE_URL + "/api/accounts/" + localStorage.getItem("Id"),
        getBaseQueryRequest(),
      ).then((data) => data.json()),
    );
  }

  async function GetAllData() {
    SetAllTickets(
      await fetch(
        API_BASE_URL +
          "/GetTicketByDepartment?AccountId=" +
          localStorage.getItem("Id"),
        getBaseQueryRequest(),
      ).then((data) => data.json()),
    );
  }

  async function GetAssignedData() {
    SetAssignedTickets(
      await fetch(
        API_BASE_URL +
          "/GetAssignedTickets?AccountId=" +
          localStorage.getItem("Id"),
        getBaseQueryRequest(),
      ).then((data) => data.json()),
    );
  }

  return (
    <div className="px-24 text-left">
      <Settings></Settings>
      <div className="flex justify-center pb-16 pt-10">
        <Header></Header>
      </div>
      <div className="grid gap-12">
        <div>
          <h1 className="text-4xl font-medium">Serivce Employee</h1>
          <Separator className="my-4" />
          <Tabs defaultValue="all tickets">
            <TabsList>
              <TabsTrigger value="all tickets">All Tickets</TabsTrigger>
              <TabsTrigger value="assigned tickets">
                Assigned Tickets
              </TabsTrigger>
              <TabsTrigger value="machines">Machines</TabsTrigger>
            </TabsList>
            <TabsContent value="all tickets">
              <Table
                displayColumns={[
                  "ID",
                  "Priority",
                  "Client",
                  "Date",
                  "Status",
                  "Options",
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
            <TabsContent value="assigned tickets">
              <Table
                displayColumns={[
                  "ID",
                  "Priority",
                  "Client",
                  "Date",
                  "Status",
                  "Options",
                ]}
                data={AssignedTickets}
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
