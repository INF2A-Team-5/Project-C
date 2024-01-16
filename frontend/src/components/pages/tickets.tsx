import { Ticket } from "../../types/Ticket";
import Table from "../foundations/table";
import { API_BASE_URL, getBaseQueryRequest } from "@/lib/api";
import { ticketColumns } from "@/services/Columns";

import Layout from "../layout";
import { toast } from "../ui/use-toast";
import TableSkeleton from "../foundations/table-skeleton";
import { useEffect, useState } from "react";
import CreateTicketDialog from "../foundations/create-ticket-dialog";
import { t } from "i18next";

function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>();
  const Id = localStorage.getItem("Id");

  useEffect(() => {
    if (tickets == undefined) {
      getTickets();
    }
  });
  async function getTickets() {
    try {
      setTickets(
        await fetch(
          API_BASE_URL + "/api/tickets?AccountId=" + Id + "&archived=false",
          getBaseQueryRequest(),
        ).then((data) => data.json()),
      );
    } catch {
      toast({
        variant: "destructive",
        title: t("toast.errortitle"),
        description: t("toast.no_data_error"),
      });
    }
  }

  return (
    <Layout>
      <div className="mt-16 flex w-full max-w-screen flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium">{t("ticket.h1")}</h1>
          <CreateTicketDialog isFetching={false} />
        </div>
        <div className="grid gap-12">
          {tickets ? (
            <Table data={tickets} columns={ticketColumns(t)} />
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
