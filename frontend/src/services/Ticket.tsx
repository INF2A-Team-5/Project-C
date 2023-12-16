export type Ticket = {
  ticketId: number;
  machine_Id: number;
  customer_Id: number;
  employee_Id: number;
  title: string;
  priority: string;
  status: string;
  problem: string;
  haveTried: string;
  mustBeDoing: string;
  date_Created: string;
  solution: string;
  phoneNumber: string;
  notes: string[];
  files: string[];
};
