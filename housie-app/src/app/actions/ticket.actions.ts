import { Action } from '@ngrx/store';

export const GENERATE_GAME = '[TICKET] Generate';

export class GenerateTicketAction implements Action {
    readonly type = GENERATE_GAME;

    constructor(public payload: any) { }
}

export type Actions = GenerateTicketAction;