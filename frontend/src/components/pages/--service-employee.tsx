import { useState } from "react";
import Table from "../foundations/table";
import { Ticket } from "../../services/Ticket";
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
import AddMachineSolution from "../foundations/add-machine-solution";
import AddSolution from "../foundations/add-ticket-solution";
import AddMachine from "../foundations/add-machine";
import { Separator } from "../ui/separator";
import {
  API_BASE_URL,
  getBaseQueryRequest,
} from "@/lib/api";
import { Machine } from "@/services/Machine";
import { machineColumns, ticketColumns } from "@/services/Columns";

function serviceEmployee() {
  useAuthenticated();
  const [AllTickets, SetAllTickets] = useState<Ticket[]>([]);
  const [AssignedTickets, SetAssignedTickets] = useState<Ticket[]>([]);
  const [Account, SetAccount] = useState();
  const [LoadData, SetData] = useState<Boolean>(false);
  const [AllMachines, SetAllMachines] = useState<Machine[]>([]);

  if (LoadData == false) {
    GetAllData();
    SetData(true);
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
      )
        .then((data) => data.json())
        .then((data) =>
          data.sort((a: Ticket, b: Ticket) => a.ticketId - b.ticketId),
        ),
    );
    SetAssignedTickets(
      await fetch(
        API_BASE_URL +
          "/GetAssignedTickets?AccountId=" +
          localStorage.getItem("Id"),
        getBaseQueryRequest(),
      )
        .then((data) => data.json())
        .then((data) =>
          data.sort((a: Ticket, b: Ticket) => a.ticketId - b.ticketId),
        ),
    );
    SetAllMachines(
      await fetch(API_BASE_URL + "/api/Machines", getBaseQueryRequest())
        .then((data) => data.json())
        .then((data) =>
          data.sort((a: Machine, b: Machine) => a.machineId - b.machineId),
        ),
    );
  }

  return (
    <div className="px-24 text-left">
      <div className="flex justify-center pb-16 pt-10">
        <Header></Header>
      </div>
      <div className="grid gap-12">
        <div>
          <h1 className="text-4xl font-medium">Service Employee</h1>
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
              <Table columns={ticketColumns} data={AllTickets} />
            </TabsContent>
            <TabsContent value="assigned tickets">
              <Table columns={ticketColumns} data={AssignedTickets} />
            </TabsContent>
            <TabsContent value="machines">
              <Table columns={machineColumns} data={AllMachines} />
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
