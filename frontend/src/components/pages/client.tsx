import Settings from "../foundations/settings";
import { Button } from "../ui/button";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";
import { Toaster } from "@/components/ui/toaster";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Header from "../foundations/header";
import { Separator } from "../ui/separator";
import Table from "../foundations/table";
import { useState } from "react";
import { DataRow } from "@/services/DataRow";
import { API_BASE_URL, getBaseQueryRequest } from "@/lib/api";

function Client() {
  const [Tickets, SetTickets] = useState<DataRow[]>([]);
  // console.log(Tickets);
  if (Tickets.length == 0) {
    GetData();
  }

  async function GetData() {
    SetTickets(
      // await fetch(API_BASE_URL + "/api/tickets/" + getBaseQueryRequest)
      //   .then((data) => data.json())
      //   .then((tickets) =>
      //     tickets.filter(
      //       (client: any) => client.customer_Id == localStorage.getItem("Id"),
      //     ),
      //   ),

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
            (client: any) => client.customer_Id == localStorage.getItem("Id")
          )
        )
    );
  }

  useAuthenticated();
  return (
    <div className="px-24 text-left">
      <Settings></Settings>
      <div className="flex justify-center pb-16 pt-10">
        <Header></Header>
      </div>
      <h1 className="text-4xl font-medium">Client</h1>
      <Separator className="my-4" />
      {/* <Tablea></Tablea> */}

      <Table data={Tickets} displayColumns={[
        "ID",
        "Title",
        "Priority",
        "Date",
        "Status",
        "",
      ]} dataColumns={[
        "ticketId",
        "Title",
        "priority",
        "date_Created",
        "status",
      ]} />

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create Ticket</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Before you make a ticket, have you tried?</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Restarting the machine?
            <br />
            Checking if the sensors are blocked?
            <br />
            Checking for any stuck items?
            <br />
          </DialogDescription>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">No, I haven't.</Button>
            </DialogClose>
            <Link to="/tickets">
              <Button>Yes, I have.</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
}

export default Client;
