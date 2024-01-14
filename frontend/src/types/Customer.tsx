import { Account } from "./Account"
import { Machine } from "./Machine"
import { Ticket } from "./Ticket"

export type Customer =
    {
        customerId: number
        accountId: number
        Account: Account
        Machines: Machine[]
        Tickets: Ticket[]
    }