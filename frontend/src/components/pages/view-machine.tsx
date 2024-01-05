import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Textarea, TextareaHint } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  API_BASE_URL,
  getBaseQueryRequest,
  putBaseMutateRequest,
  useQuery,
} from "@/lib/api";
import { Toaster } from "../ui/toaster";
import { toast } from "../ui/use-toast";
import Layout from "../layout";
import { Machine } from "@/types/machine";
import { solutionColumns } from "@/services/Columns";
import Table from "../foundations/table";
import TableSkeleton from "../foundations/table-skeleton";
import { Solution } from "@/types/solution";

function ViewMachine() {
  const machineID = localStorage.getItem("currentmachineID");
  const [currentMachine, setCurrentMachine] = useState<Machine | undefined>(
    undefined,
  );

  // let { data } = null;
  // if (currentMachine) {
  const { data } = useQuery<Solution[]>("/GetsolutionsPerMachine?id=" + machineID, {
    onError: () => {
      toast({
        variant: "destructive",
        title: "Whomp whomp:(",
        description: "U get no data",
      });
    },
  });
  // }

  useEffect(() => {
    getMachine();

  }, []);

  // useEffect(() => {
  //   showMachine();
  // }, []);

  async function getMachine() {
    let machine = await fetch(
      API_BASE_URL + "/api/machines/" + machineID,
      getBaseQueryRequest(),
    ).then((data) => data.json());
    console.log(machine)
    setCurrentMachine(machine);
    // return currentTicket;
  }

  return (
    <Layout>
      <div className="mt-16 flex w-full max-w-screen flex-col">
        <div className="grid gap-8">

          {currentMachine && (
            <div>
              <div className="px-4 px-0">
                <h1 className="text-3xl font-medium">{currentMachine.name}</h1>
                <p className="mt-1 max-w-2xl text-lg leading-6 text-foreground">Machine information</p>
                <p className="mt-1 max-w-2xl text-lg leading-6 text-foreground">Machine ID: {currentMachine.machineId}</p>
              </div>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 grid grid-cols-2 gap-2 px-0">
                    <p className="text-xl font-medium leading-6 text-foreground">Description</p>
                    <p className="mt-1 text-lg leading-6 text-foreground col-span-2 mt-0">{currentMachine.description}</p>
                  </div>
                  <div className="px-4 py-6 grid grid-cols-2 gap-2 px-0">
                    <p className="text-xl font-medium leading-6 text-foreground">Customer</p>
                    <p className="mt-1 text-lg leading-6 text-foreground col-span-2 mt-0">{currentMachine.customer_Id}</p>
                  </div>
                  <div className="px-4 py-6  grid-cols-2 gap-2 px-0">
                    <p className="text-xl font-medium leading-6 text-foreground">Solutions of this machines</p>
                    <div className="grid gap-12">
                      {data ? (
                        <Table data={data} columns={solutionColumns} />
                      ) : (
                        <TableSkeleton />
                      )}
                      <div className="h-44"></div>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );


}
export default ViewMachine;