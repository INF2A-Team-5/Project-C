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
import { Department } from "@/types/Department";
import { toast } from "../ui/use-toast";
import { TextareaHint } from "../ui/textarea";
import Layout from "../layout";
import AddDepartment from "../foundations/add-department";
import TableSkeleton from "../foundations/table-skeleton";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function Departments() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const { data, isFetching } = useQuery<Department[]>(`/api/departments/archived/${false}`, {

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
          <h1 className="text-3xl font-medium">{t("department.h1")}</h1>
          <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" disabled={isFetching}>
              {t("department.add")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("department.add")}</DialogTitle>
                <TextareaHint>{t("department.create")}</TextareaHint>
              </DialogHeader>
              <DialogDescription>
                <AddDepartment  setOpen={setOpen}/>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid gap-12">
          {data ? (
            <Table data={data} columns={departmentColumns(t)} />
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
