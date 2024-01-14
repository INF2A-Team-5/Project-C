import { Department } from "./Department";

export type MachineModel = {
  modelId: number;
  name: string;
  description: string;
  department: Department;
  solution: string;
};
