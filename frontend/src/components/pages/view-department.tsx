import { useEffect, useState } from "react";
import { API_BASE_URL, getBaseQueryRequest, useQuery } from "@/lib/api";
import { toast } from "../ui/use-toast";
import Layout from "../layout";
import {
  departmentColumns,
  employeeColumns,
  modelColums,
  solutionColumns,
} from "@/services/Columns";
import Table from "../foundations/table";
import TableSkeleton from "../foundations/table-skeleton";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MachineModel } from "@/types/MachineModel";
import { Employee } from "@/types/Employee";
import { Department } from "@/types/Department";

function ViewDepartment() {
  const departmentID = localStorage.getItem("currentdepartmentID");
  const [machines, setMachines] = useState<MachineModel[]>();
  const [employees, setEmployees] = useState<Employee[]>();
  const [department, setDepartment] = useState<Department>();

  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    getDepartment();
    getMachines();
    getEmployees();
  }, []);

  async function getDepartment() {
    let department = await fetch(
      API_BASE_URL + "/api/Departments/" + departmentID,
      getBaseQueryRequest(),
    ).then((data) => data.json());
    setDepartment(department);
  }
  async function getMachines() {
    let machines = await fetch(
      API_BASE_URL + "/GetModelByDepartmentId?DepartmentId=" + departmentID,
      getBaseQueryRequest(),
    ).then((data) => data.json());
    setMachines(machines);
  }

  async function getEmployees() {
    let employees = await fetch(
      API_BASE_URL + "/GetEmployeesByDepartmentId?DepartmentId=" + departmentID,
      getBaseQueryRequest(),
    ).then((data) => data.json());
    setEmployees(employees);
  }

  async function handleCancel() {
    navigate(-1);
  }
  return (
    <Layout>
      <div className="mt-16 flex w-full max-w-screen flex-col gap-8">
        <h1 className="text-3xl font-medium">{department?.name}</h1>
        <div className="grid gap-3">
          <p className="text-xl font-medium leading-4 text-foreground">
            Machines
          </p>
          {machines ? (
            <Table data={machines} columns={modelColums(t)} />
          ) : (
            <TableSkeleton />
          )}
        </div>
        <div className="grip gap-12">
          <p className="text-xl font-medium leading-10 text-foreground">
            {t("misc.employees")}
          </p>
          {employees ? (
            <Table data={employees} columns={employeeColumns(t)} />
          ) : (
            <TableSkeleton />
          )}
          <div className="py-3.5">
          <Button variant="default" size="sm" onClick={handleCancel}>
                {t("misc.go_back")}
                </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default ViewDepartment;
