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
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import CreateTicketDialog from "../foundations/create-ticket-dialog";

function Tickets() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, []);
  const { data, isFetching } = useQuery<Ticket[]>("/api/tickets?AccountId=" + localStorage.getItem("Id"), {
 //onst { data, isFetching } = useQuery<Ticket[]>(`/api/tickets/archived/${false}`, {
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
          <h1 className="text-3xl font-medium">{t("ticket.h1")}</h1>
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

export default Tickets;
