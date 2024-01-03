export type Ticket = {
  ticketId: number;
  machineId: number;
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
