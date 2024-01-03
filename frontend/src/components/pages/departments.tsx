import Table from "../foundations/table";
import { useQuery } from "@/lib/api";
import { departmentColumns } from "@/services/Columns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Department } from "@/types/department";
import { toast } from "../ui/use-toast";
import { TextareaHint } from "../ui/textarea";
import Layout from "../layout";
import AddDepartment from "../foundations/add-department";
import TableSkeleton from "../foundations/table-skeleton";

function Departments() {
  const { data, isFetching } = useQuery<Department[]>(`/api/departments/archived/${false}`, {
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
          <h1 className="text-3xl font-medium">Departments</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" disabled={isFetching}>
                Add department
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add department</DialogTitle>
                <TextareaHint>Create Departments for new services</TextareaHint>
              </DialogHeader>
              <DialogDescription>
                <AddDepartment />
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid gap-12">
          {data ? (
            <Table data={data} columns={departmentColumns} />
          ) : (
            <TableSkeleton />
          )}
          <div className="h-44"></div>
        </div>
      </div>
    </Layout>
  );
}

export default Departments;
