import { Ticket } from "../../types/Ticket";
import Table from "../foundations/table";
import { API_BASE_URL, getBaseQueryRequest, useQuery } from "@/lib/api";
import { ticketColumns } from "@/services/Columns";
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
import Layout from "../layout";
import { toast } from "../ui/use-toast";
import TableSkeleton from "../foundations/table-skeleton";
import { useEffect, useState } from "react";

function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>()
  const Id = localStorage.getItem("Id");

  useEffect(() => {
    if (tickets == undefined) {
      getTickets();
    }
  });

  async function getTickets() {
    try{
    setTickets(
      await fetch(
        API_BASE_URL + "/api/tickets?AccountId=" + Id +
        "&archived=false",
        getBaseQueryRequest(),
      ).then((data) => data.json()),
    );
      }
      catch
      {
        toast({
          variant: "destructive",
          title: "Whomp whomp:(",
          description: "U get no data",
        });
      }
  }

  return (
    <Layout>
      <div className="mt-16 flex w-full max-w-screen flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium">Tickets</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="default">
                Create ticket
              </Button>
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
        <div className="grid gap-12">
          {tickets ? (
            <Table data={tickets} columns={ticketColumns} />
          ) : (
            <TableSkeleton />
          )}
          <div className="h-44"></div>
        </div>
      </div>
    </Layout>
  );
}

export default Tickets;
