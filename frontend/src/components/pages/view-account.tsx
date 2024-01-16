import { useEffect, useState } from "react";

import { API_BASE_URL, getBaseQueryRequest } from "@/lib/api";

import Layout from "../layout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Account } from "@/types/Account";
import { Employee } from "@/types/Employee";
import { MachineInfoDto } from "@/types/MachineInfo";
import { Button } from "../ui/button";
import { Department } from "@/types/Department";
import { useNavigate } from "react-router-dom";
import { TextareaHint } from "../ui/textarea";
import AddMachineToCustomer from "../foundations/add-machine-to-customer";
import { infoColumns } from "@/services/Columns";
import Table from "../foundations/table";
import TableSkeleton from "../foundations/table-skeleton";
import { useTranslation } from "react-i18next";

function ViewAccount() {
  const [open, setOpen] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<Account>();
  const [customerMachines, setCustomerMachines] = useState<MachineInfoDto[]>(
    [],
  );
  const [employee, setEmployee] = useState<Employee>();
  const [department, setDepartment] = useState<Department>();
  const Id = localStorage.getItem("currentaccountID");
  const [isCustomer, setisCustomer] = useState<boolean>(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (currentAccount == undefined) {
      getAccount();
    }
    if (currentAccount?.class == "ServiceEmployee" && department == undefined) {
      Employee();
      Department();
    }
    if (currentAccount?.class == "Client" && isCustomer == false) {
      Customer();
    }
    if (localStorage.getItem("currentaccountID") == undefined) {
      navigate("/accounts");
    }
  });

  async function getAccount() {
    setCurrentAccount(
      await fetch(
        API_BASE_URL + "/api/accounts/" + Id,
        getBaseQueryRequest(),
      ).then((data) => data.json()),
    );
  }

  async function Customer() {
    setCustomerMachines(
      await fetch(
        `${API_BASE_URL}/GetMachinesPerAccount?accountId=${Id}`,
        getBaseQueryRequest(),
      ).then((data) => data.json()),
    );
    setisCustomer(true);
  }

  async function Employee() {
    setEmployee(
      await fetch(
        API_BASE_URL + "/GetEmployeeById?id=" + Id,
        getBaseQueryRequest(),
      ).then((data) => data.json()),
    );
  }
  async function Department() {
    if (employee != undefined) {
      setDepartment(
        await fetch(
          `${API_BASE_URL}/api/Departments/${employee.departmentId}`,
          getBaseQueryRequest(),
        ).then((data) => data.json()),
      );
    }
  }
  async function handleCancel() {
    navigate(-1);
  }
  return (
    <Layout>
      {currentAccount && (
        <div className="mt-16 flex w-full max-w-screen flex-col ">
          <div className="px-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-medium">
                Account ID: {currentAccount.accountId}
              </h1>
              <Button
                className=""
                variant="default"
                size="default"
                onClick={handleCancel}
              >
                {t("misc.go_back")}
              </Button>
            </div>
            <p className="mt-1 text-lg text-foreground">
              {t("misc.account_type")}: {currentAccount.class}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 px-4 pt-6">
            <p className="text-xl font-medium text-foreground">
              {t("table.name")}
            </p>
            <p className="col-span-2 text-lg text-foreground">
              {currentAccount.name}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 px-4 py-6">
            <p className="text-xl font-medium  text-foreground">
              {t("misc.password")}
            </p>
            <p className="col-span-2 text-lg text-foreground">
              {currentAccount.password}
            </p>
          </div>
          {employee ? (
            <div className="grid grid-cols-2 gap-2 px-4 py-6">
              <p className="text-xl font-medium text-foreground">
                {t("misc.department")}
              </p>
              <p className="col-span-2 mt-2 text-lg text-foreground">
                {department?.name}
              </p>
            </div>
          ) : null}
          <div className=" px-4">
            <p className="text-xl font-medium text-foreground">
              {t("misc.phone")}
            </p>
            {currentAccount.phoneNumber ? (
              <p className="col-span-2 mt-0 mt-1 text-lg leading-6 text-foreground">
                {currentAccount.phoneNumber}
              </p>
            ) : (
              <p className="col-span-2 mt-0 mt-1 text-lg leading-6 text-foreground">
                {t("misc.no_phone_connected")}
              </p>
            )}
            <div>
              {isCustomer ? (
                <div className="grid gap-2 px-0 py-6">
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-medium text-foreground">
                      Machines
                    </p>
                    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
                      <DialogTrigger asChild>
                        <Button variant="default" size="sm">
                          {t("misc.add_machine_to_customer")}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{t("misc.add_machine")}</DialogTitle>
                          <TextareaHint>
                            {t("misc.add_machine_to_customer")}
                          </TextareaHint>
                        </DialogHeader>
                        <DialogDescription className="grid gap-2">
                          <AddMachineToCustomer setOpen={setOpen} />
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="w-full">
                    {customerMachines.length == 0 ? (
                      <TableSkeleton />
                    ) : (
                      <Table data={customerMachines} columns={infoColumns} />
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
export default ViewAccount;
