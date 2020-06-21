import { MatTableDataSource } from '@angular/material/table';
import { TicketModel } from '../models/ticket.model';

export class TicketState {
    static readonly default: TicketState = Object.seal({
        ticketId: 0,
        tickets: new MatTableDataSource()
    });
    ticketId: Number;
    tickets: MatTableDataSource<TicketModel[]>;
}
