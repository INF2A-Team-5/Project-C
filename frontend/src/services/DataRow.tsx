export type DataRow = {
    ticketId: number,
    machine_Id: number,
    customer_Id: number,
    assigned_Id: number,
    priority: string,
    status: string,
    date_Created: string,
    solution: string,
    files: string[],
    phoneNumber: string,
    notes: string;
};