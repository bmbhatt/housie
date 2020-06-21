import { MatTableDataSource } from '@angular/material/table';
import * as TicketActions from '../actions/ticket.actions';
import { TicketState } from '../tickets/ticket.state';
import { TicketModel } from '../models/ticket.model';

export function ticketReducer(state = TicketState.default, action: TicketActions.Actions) {
    switch (action.type) {
        case TicketActions.GENERATE_GAME:
            return populateGameState(state, action.payload);
        default:
            return state;
    }
}

function populateGameState(state: any, data: any) {
    let ticketNumbers = data.tickets;
    let allTicketNos = new Array(3);
    for (let index = 0, c = 0; index < ticketNumbers.length; index += 9) {
        allTicketNos[c] = {
            'num1': ticketNumbers[index],
            'num2': ticketNumbers[index + 1],
            'num3': ticketNumbers[index + 2],
            'num4': ticketNumbers[index + 3],
            'num5': ticketNumbers[index + 4],
            'num6': ticketNumbers[index + 5],
            'num7': ticketNumbers[index + 6],
            'num8': ticketNumbers[index + 7],
            'num9': ticketNumbers[index + 8]
        };
        c++;
    }
    let datasource = new MatTableDataSource<TicketModel[]>();
    datasource.data = allTicketNos;
    return Object.assign({}, {
        ticketId: data.ticketId, tickets: datasource
    });
}

