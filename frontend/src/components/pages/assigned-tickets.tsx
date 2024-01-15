import { Ticket } from "../../types/Ticket";
import Table from "../foundations/table";
import { useQuery } from "@/lib/api";
import { ticketColumns } from "@/services/Columns";
import Layout from "../layout";
import { toast } from "../ui/use-toast";
import TableSkeleton from "../foundations/table-skeleton";
import { useTranslation } from "react-i18next";
import CreateTicketDialog from "../foundations/create-ticket-dialog";

function AssignedTickets() {
  const { t } = useTranslation();

  const { data, isFetching } = useQuery<Ticket[]>("/GetAssignedTickets?AccountId=" + localStorage.getItem("Id"), {
    onError: () => {
      toast({
        variant: "destructive",
        title: t("errortitle"),
        description: t("no_data_error"),
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
            <Table data={data} columns={ticketColumns(t)} />
          ) : (
            <TableSkeleton />
          )}
          <div className="h-44"></div>
        </div>
      </div>
    </Layout>
  );
}

export default AssignedTickets;
