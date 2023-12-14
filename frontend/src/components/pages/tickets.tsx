import { useState } from "react";
import Settings from "../foundations/settings";
import { Ticket } from "../../services/Ticket";
import Table from "../foundations/table";
import { useAuthenticated } from "@/lib/hooks/useAuthenticated";
import { Toaster } from "../ui/toaster";
import { API_BASE_URL, getBaseQueryRequest } from "@/lib/api";
import { ticketColumns } from "@/services/Columns";
import Navbar from "../foundations/navbar";
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
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Tickets() {
  useAuthenticated();
  const [AllTickets, SetAllTickets] = useState<Ticket[]>([]);
  const [LoadData, SetData] = useState<Boolean>(false);
  if (LoadData == false) {
    GetData();
    SetData(true);
  }

  async function GetData() {
    SetAllTickets(
      await fetch(API_BASE_URL + "/api/tickets", getBaseQueryRequest()).then(
        (data) => data.json(),
      ),
    );
  }

  return (
    <>
      <Navbar />
      <Settings></Settings>
      <div className="grid gap-8 px-24 text-left">
        <div className="h-24" />
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-medium">Tickets</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">Create Ticket</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Before you make a ticket, have you tried?
                </DialogTitle>
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
                <Link to="/create-ticket">
                  <Button>Yes, I have.</Button>
                </Link>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {/* <Button variant="outline" className="w-fit" >dddddddddddddd</Button> */}
        <div className="grid gap-12">
          <Table data={AllTickets} columns={ticketColumns} />
          <div className="h-44"></div>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default Tickets;
