import { Icons } from "../foundations/icons";
import { Ticket } from "../../services/Ticket";
import Table from "../foundations/table";
import { Toaster } from "../ui/toaster";
import { useQuery } from "@/lib/api";
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
import { useEffect } from "react";

function Tickets() {
  const { data, isFetching } = useQuery<Ticket[]>("/api/tickets", {
    onError: () => {
      toast({
        variant: "destructive",
        title: "Whomp whomp:(",
        description: "U get no data",
      });
    },
  });

  return (
    <Layout>
      <div className="mt-16 flex w-full max-w-screen flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium">Tickets</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" disabled={isFetching} variant="default">
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
          {data ? (
            <Table data={data} columns={ticketColumns} />
          ) : (
            <div className="flex h-[20rem] w-full items-center justify-center">
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            </div>
          )}
          <div className="h-44"></div>
        </div>
      </div>
    </Layout>
  );
}

export default Tickets;
