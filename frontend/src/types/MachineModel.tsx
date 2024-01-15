import { Department } from "./Department";

export type MachineModel = {
  modelId: number;
  name: string;
  description: string;
  departmentId: number
  department: Department;
  solution: string;
  archived: boolean
};
