import { useState } from "react";
import Settings from "../foundations/settings";
import { Ticket } from "../../services/Ticket";
import Table from "../foundations/table";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Header from "../foundations/header";
import AddAccount from "./addAccount";
import AddMachine from "./addMachine";
import AddDepartment from "./addDepartment";
import AddSolution from "./AddTicketSolution";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import AddMachineSolution from "./AddMachineSolution";
import { Toaster } from "../ui/toaster";
import { Separator } from "../ui/separator";
import { API_BASE_URL, getBaseQueryRequest } from "@/lib/api";
import { Machine } from "@/services/Machine";
import { accountColumns, departmentColumns, machineColumns, ticketColumns } from "@/services/Columns";
import { Account } from "@/services/Account";
import { Department } from "@/services/Department";

function Admin() {
  // useAuthenticated();

  const [AssignedTickets, SetAssignedTickets] = useState<Ticket[]>([]);
  const [AllTickets, SetAllTickets] = useState<Ticket[]>([]);
  const [LoadData, SetData] = useState<Boolean>(false);
  const [AllMachines, SetAllMachines] = useState<Machine[]>([]);
  const [AllAccounts, SetAllAccounts] = useState<Account[]>([]);
  const [AllDepartments, SetAllDepartments] = useState<Department[]>([]);

  if (LoadData == false) {
    GetData();
    SetData(true);
  }

  async function GetData() {
    SetAllTickets(
      await fetch(
        API_BASE_URL +
        "/api/tickets",
        getBaseQueryRequest(),
      ).then((data) => data.json()).then((data) => data.sort((a: Ticket, b: Ticket) => a.ticketId - b.ticketId)));
    SetAssignedTickets(
      await fetch(
        API_BASE_URL +
        "/GetAssignedTickets?AccountId=" +
        localStorage.getItem("Id"),
        getBaseQueryRequest(),
      ).then((data) => data.json()).then((data) => data.sort((a: Ticket, b: Ticket) => a.ticketId - b.ticketId)));
      SetAllMachines(
      await fetch(API_BASE_URL + "/api/Machines", getBaseQueryRequest())
        .then((data) => data.json()).then((data) => data.sort((a: Machine, b: Machine) => a.machineId - b.machineId)));
        SetAllAccounts(
      await fetch(API_BASE_URL + "/api/Accounts", getBaseQueryRequest())
        .then((data) => data.json()).then((data) => data.sort((a: Account, b: Account) => a.accountId - b.accountId)));
        SetAllDepartments(
      await fetch(API_BASE_URL + "/api/Departments", getBaseQueryRequest())
        .then((data) => data.json()).then((data) => data.sort((a: Department, b: Department) => a.departmentId - b.departmentId)));
  }

  return (
    <div className="px-24 text-left">
      
      <div className="flex justify-center pb-16 pt-10">
        <Header></Header>
      </div>
      <div className="grid gap-12">
        <div>
          <h1 className="text-4xl font-medium">Admin</h1>
          <Separator className="my-4" />
          <Tabs defaultValue="accounts">
            <TabsList>
              <TabsTrigger value="accounts">Accounts</TabsTrigger>
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
              <TabsTrigger value="assigned tickets">
                Assigned Tickets
              </TabsTrigger>
              <TabsTrigger value="machines">Machines</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
            </TabsList>
            <TabsContent value="accounts">
              <Table data={AllAccounts} columns={accountColumns} />
            </TabsContent>
            <TabsContent value="tickets">
              <Table data={AllTickets} columns={ticketColumns} />
            </TabsContent>
            <TabsContent value="assigned tickets">
              <Table data={AssignedTickets} columns={ticketColumns} />
            </TabsContent>
            <TabsContent value="machines">
              <Table data={AllMachines} columns={machineColumns} />
            </TabsContent>
            <TabsContent value="departments">
              <Table data={AllDepartments} columns={departmentColumns} />
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Add account</TabsTrigger>
              <TabsTrigger value="machine">Add machine</TabsTrigger>
              <TabsTrigger value="department">Add department</TabsTrigger>
              <TabsTrigger value="ticket-solution">
                Add ticket solution
              </TabsTrigger>
              <TabsTrigger value="machine-solution">
                Add machine solution
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card className="w-3/6">
                <CardHeader>
                  <CardTitle>Add Account</CardTitle>
                  <CardDescription>
                    Create accounts for new clients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AddAccount />
                </CardContent>
              </Card>
            </TabsContent>
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
            <TabsContent value="department">
              <Card className="w-3/6">
                <CardHeader>
                  <CardTitle>Add Department</CardTitle>
                  <CardDescription>
                    Create Departments for new services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AddDepartment />
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

export default Admin;
