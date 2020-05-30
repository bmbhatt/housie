import { Action } from '@ngrx/store';

export const ActionTypes = {
    RESET_BOARD: '[BOARD] Reset Board',
    RESET_BOARD_SUCCESS: '[BOARD] Reset Board Success',
    RESET_BOARD_FAILURE: '[BOARD] Reset Board Failure',
    INIT_BOARD: '[BOARD] Init Board',
    GET_CURRENT_NUMBER: '[BOARD] Get Current Number',
    GET_PREVIOUS_NUMBER: '[BOARD] Get Previous Number',
    GET_ALL_NUMBERS: '[BOARD] Get All Numbers',
    WS_NEXT: '[BOARD] WS Next Numbers',
    WS_NEXT_SUCCESS: '[BOARD] WS Next Numbers Success',
    WS_CONNECT: '[BOARD] WS Connect',
    WS_DISCONNECT: '[BOARD] WS Disconnect',
    CHANGE_PENDING: '[BOARD] Change Pending',
    LOAD_BOARD: '[BOARD] Load Board',
    LOAD_BOARD_SUCCESS: '[BOARD] Load Board Success',
    LOAD_BOARD_FAILURE: '[BOARD] Load Board Failure',
    SWAP_MUTED: '[BOARD] Swap Muted'
}

export class LoadBoardAction implements Action {
    readonly type = ActionTypes.LOAD_BOARD;
}

export class LoadBoardSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_BOARD_SUCCESS;

    constructor(public payload: number[]) {
    }
}

export class LoadBoardFailureAction implements Action {
    readonly type = ActionTypes.LOAD_BOARD_FAILURE;
}

export class ResetBoardAction implements Action {
    readonly type = ActionTypes.RESET_BOARD;
}

export class ResetBoardSuccessAction implements Action {
    readonly type = ActionTypes.RESET_BOARD_SUCCESS;
}

export class ResetBoardFailureAction implements Action {
    readonly type = ActionTypes.RESET_BOARD_FAILURE;
}

export class BoardInitActionAction implements Action {
    readonly type = ActionTypes.INIT_BOARD;
}

export class GetCurrentNumberAction implements Action {
    readonly type = ActionTypes.GET_CURRENT_NUMBER;

    constructor(public payload: number) { }
}

export class GetPreviousNumberAction implements Action {
    readonly type = ActionTypes.GET_PREVIOUS_NUMBER;

    constructor(public payload: number) { }
}

export class GetAllNumbersAction implements Action {
    readonly type = ActionTypes.GET_ALL_NUMBERS;
}

export class WSNextAction implements Action {
    readonly type = ActionTypes.WS_NEXT;
}

export class WSConnectAction implements Action {
    readonly type = ActionTypes.WS_CONNECT;
}

export class WSDisconnectAction implements Action {
    readonly type = ActionTypes.WS_DISCONNECT;
}

export class WSNextActionSuccessAction implements Action {
    readonly type = ActionTypes.WS_NEXT_SUCCESS;

    constructor(public payload: number) {
    }
}

export class ChangePendingAction implements Action {
    readonly type = ActionTypes.CHANGE_PENDING;

    constructor(public payload: boolean) {
    }
}

export class SwapMuteAction implements Action {
    readonly type = ActionTypes.SWAP_MUTED;
}

export type Actions = WSNextAction | WSNextActionSuccessAction 
| GetAllNumbersAction | GetPreviousNumberAction | GetCurrentNumberAction 
| BoardInitActionAction | ResetBoardAction | ResetBoardSuccessAction | ResetBoardFailureAction
| LoadBoardAction | LoadBoardSuccessAction | WSConnectAction | SwapMuteAction | WSDisconnectAction;