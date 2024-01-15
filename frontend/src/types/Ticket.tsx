export type Ticket = {
  ticketId: number;
  modelId: number;
  machine_Id: number;
  customerId: number;
  employeeId: number;
  title: string;
  priority: string;
  status: string;
  problem: string;
  haveTried: string;
  mustBeDoing: string;
  dateCreated: string;
  solution: string;
  phoneNumber: string;
  notes: string[];
  files: string[];
  archived: boolean;
};
