import Table from "../foundations/table";
import { Toaster } from "../ui/toaster";
import { useQuery } from "@/lib/api";
import { Machine } from "@/types/Machine";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { machineColumns } from "@/services/Columns";
import { TextareaHint } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import Layout from "../layout";
import AddMachine from "../foundations/add-machine";
import TableSkeleton from "../foundations/table-skeleton";

function Machines() {
  const isClient = localStorage.getItem("Class") == "Client";
  const apiUrl = isClient
    ? "/GetMachinesPerAccount?accountId=" + localStorage.getItem("Id")
    : `/api/machines/archived/${false}`;
  const { data, isFetching } = useQuery<Machine[]>(apiUrl, {
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
          <h1 className="text-3xl font-medium">Machines</h1>
          {localStorage.getItem("Class") == "Admin" ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" size="sm" disabled={isFetching}>
                  Add machine
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add machine</DialogTitle>
                  <TextareaHint>Create new machines</TextareaHint>
                </DialogHeader>
                <DialogDescription>
                  <AddMachine />
                </DialogDescription>
              </DialogContent>
            </Dialog>
          ) : null}
        </div>
        <div className="grid gap-12">
          {data ? (
            <Table data={data} columns={machineColumns} />
          ) : (
            <TableSkeleton />
          )}
          <div className="h-44"></div>
        </div>
      </div>
      <Toaster />
    </Layout>
  );
}

export default Machines;
