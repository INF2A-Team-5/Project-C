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
      <div className="mt-16 flex w-full max-w-screen flex-col">
        <div className="grid gap-8">
          {currentAccount && (
            <div>
              <div className="border-left-width: 1px; border-gray-100">
                <div className="px-0 px-4">
                  <h1 className="text-3xl font-medium">
                    AccountID: {currentAccount.accountId}
                  </h1>
                  <p className="mt-1 max-w-2xl text-lg leading-6 text-foreground">
                    Class: {currentAccount.class}
                  </p>
                </div>
                <div className="mt-6">
                  <div className="grid grid-cols-2 gap-2 px-0 px-4 py-6">
                    <p className="text-xl font-medium leading-6 text-foreground">
                      Name
                    </p>
                    <p className="col-span-2 mt-0 mt-1 text-lg leading-6 text-foreground">
                      {currentAccount.name}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 px-0 px-4 py-6">
                    <p className="text-xl font-medium leading-6 text-foreground">
                      Password
                    </p>
                    <p className="col-span-2 mt-0 mt-1 text-lg leading-6 text-foreground">
                      {currentAccount.password}
                    </p>
                  </div>
                  {employee ? (
                    <div className="grid grid-cols-2 gap-2 px-0 px-4 py-6">
                      <p className="text-xl font-medium leading-6 text-foreground">
                        Department
                      </p>
                      <p className="col-span-2 mt-0 mt-1 text-lg leading-6 text-foreground">
                        {department?.name}
                      </p>
                    </div>
                  ) : null}
                  <div className="grid grid-cols-2 gap-2 px-0 px-4 py-6">
                    <p className="text-xl font-medium leading-6 text-foreground">
                      Phone number
                    </p>
                    {currentAccount.phoneNumber ? (
                      <p className="col-span-2 mt-0 mt-1 text-lg leading-6 text-foreground">
                        {currentAccount.phoneNumber}
                      </p>
                    ) : (
                      <p className="col-span-2 mt-0 mt-1 text-lg leading-6 text-foreground">
                        There is no phone number connected to this account
                      </p>
                    )}
                    {isCustomer ? (
                      <div className="grid gap-2 px-0 px-4 py-6">
                        <p className="text-xl font-medium leading-6 text-foreground">
                          Machines
                        </p>
                        {customerMachines.length == 0 ? (
                          <TableSkeleton />
                        ) : (
                          <Table
                            data={customerMachines}
                            columns={infoColumns}
                          />
                        )}
                        <div className="h-44">
                          <Dialog
                            open={open}
                            onOpenChange={(open) => setOpen(open)}
                          >
                            <DialogTrigger asChild>
                              <Button variant="default" size="sm">
                                Add machine to this customer
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add Machine</DialogTitle>
                                <TextareaHint>
                                  Add new machine to customer
                                </TextareaHint>
                              </DialogHeader>
                              <DialogDescription className="grid gap-2">
                                <AddMachineToCustomer setOpen={setOpen} />
                              </DialogDescription>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <Button variant="default" size="sm" onClick={handleCancel}>
                  Go back
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
export default ViewAccount;
