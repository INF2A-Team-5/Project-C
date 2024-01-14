import { Ticket } from "../../types/Ticket";
import Table from "../foundations/table";
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
import TableSkeleton from "../foundations/table-skeleton";
import CreateTicketDialog from "../foundations/create-ticket-dialog";

function ClosedTickets() {
  const { data, isFetching } = useQuery<Ticket[]>("/GetClosedTickets", {
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
          <CreateTicketDialog isFetching={isFetching}/>
        </div>
        <div className="grid gap-12">
          {data ? (
            <Table data={data} columns={ticketColumns} />
          ) : (
            <TableSkeleton />
          )}
          <div className="h-44"></div>
        </div>
      </div>
    </Layout>
  );
}

export default ClosedTickets;
