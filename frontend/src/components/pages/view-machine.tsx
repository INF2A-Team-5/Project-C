import { useEffect, useState } from "react";
import { API_BASE_URL, getBaseQueryRequest, useQuery } from "@/lib/api";
import { toast } from "../ui/use-toast";
import Layout from "../layout";
import { solutionColumns } from "@/services/Columns";
import Table from "../foundations/table";
import TableSkeleton from "../foundations/table-skeleton";
import { Solution } from "@/types/solution";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { MachineInfoDto } from "@/types/MachineInfo";
import { useTranslation } from "react-i18next";

function ViewMachine() {
  const machineID = localStorage.getItem("currentmachineID");
  const [currentMachine, setCurrentMachine] = useState<MachineInfoDto>();
  const { t, } = useTranslation();
  const navigate = useNavigate();
  const { data } = useQuery<Solution[]>(
    "/GetsolutionsPerMachine?id=" + machineID,
    {
      onError: () => {
        toast({
          variant: "destructive",
          title: t("toast.errortitle"),
          description: t("toast.no_data_error"),
        });
      },
    },
  );
  useEffect(() => {
    getMachine();
  }, []);

  async function getMachine() {
    let machine = await fetch(
      API_BASE_URL + "/api/machines/" + machineID,
      getBaseQueryRequest(),
    ).then((data) => data.json());
    setCurrentMachine(machine);
  }
  async function handleCancel() {
    navigate(-1);
  }
  return (
    <Layout>
      <div className="mt-16 flex w-full max-w-screen flex-col">
        <div className="grid gap-8">
          {currentMachine && (
            <div>
              <div className="px-0 px-4">
                <h1 className="text-3xl font-medium">{currentMachine.name}</h1>
                <p className="mt-1 max-w-2xl text-lg leading-6 text-foreground">
                  {t("machine.machine_info")}
                </p>
                <p className="mt-1 max-w-2xl text-lg leading-6 text-foreground">
                  Model ID: {currentMachine.modelId}
                </p>
              
                <p className="mt-1 max-w-2xl text-lg leading-6 text-foreground">
                  Machine ID: {currentMachine.machineId}
                </p>
              </div>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="grid grid-cols-2 gap-2 px-0 px-4 py-6">
                    <p className="text-xl font-medium leading-6 text-foreground">
                      {t("table.description")}
                    </p>
                    <p className="col-span-2 mt-0 mt-1 text-lg leading-6 text-foreground">
                      {currentMachine.description}
                    </p>
                  </div>
                  <div className="grid-cols-2 gap-2  px-0 px-4 py-6">
                    <p className="text-xl font-medium leading-6 text-foreground">
                      {t("machine.solution")}
                    </p>
                    <div className="grid gap-12">
                      {data ? (
                        <Table data={data} columns={solutionColumns(t)} />
                      ) : (
                        <TableSkeleton />
                      )}
                      <div className="h-44"></div>
                    </div>
                  </div>
                </dl>
                <Button variant="default" size="sm" onClick={handleCancel}>
                  {t("misc.go_back")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
export default ViewMachine;
