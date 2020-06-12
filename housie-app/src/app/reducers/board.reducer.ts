import { Action } from '@ngrx/store';
import { BoardModel } from '../models/game.model';
import { ActionTypes, WSNextActionSuccessAction, LoadBoardSuccessAction, ChangePendingAction, GetCurrentNumberAction, GetPreviousNumberAction } from './../actions/board.actions';
import { BoardState } from '../board/board.state';


export function boardReducer(state = BoardState.default, action: Action) {
    switch (action.type) {
        case ActionTypes.RESET_BOARD:
            return state;
        case ActionTypes.RESET_BOARD_SUCCESS:
            let ad = initAllDigits();
            return Object.assign({}, {
                allDigits: ad, nextNumber: 0,
                previousNumber: 0, pending: false, muted: state.muted
            });
        case ActionTypes.RESET_BOARD_FAILURE:
            return state;
        case ActionTypes.INIT_BOARD:
            let adigits = initAllDigits();
            return Object.assign({}, {
                allDigits: adigits, nextNumber: 0,
                previousNumber: 0, pending: false, muted: state.muted
            });
        case ActionTypes.GET_ALL_NUMBERS:
            return state;
        case ActionTypes.GET_CURRENT_NUMBER:
            return Object.assign({}, {
                allDigits: state.allDigits, nextNumber: (<GetCurrentNumberAction>action).payload,
                previousNumber: state.previousNumber, pending: state.pending, muted: state.muted
            });
        case ActionTypes.GET_PREVIOUS_NUMBER:
            return Object.assign({}, {
                allDigits: state.allDigits, nextNumber: state.nextNumber,
                previousNumber: (<GetPreviousNumberAction>action).payload, pending: state.pending, muted: state.muted
            });
        case ActionTypes.WS_NEXT:
            return state;
        case ActionTypes.WS_NEXT_SUCCESS:
            return populateNext(state, (<WSNextActionSuccessAction>action).payload);
        case ActionTypes.WS_CONNECT:
            return state;
        case ActionTypes.WS_DISCONNECT:
            return state;
        case ActionTypes.CHANGE_PENDING:
            return Object.assign({}, {
                allDigits: state.allDigits, nextNumber: state.nextNumber,
                previousNumber: state.previousNumber, pending: (<ChangePendingAction>action).payload, muted: state.muted
            });
        case ActionTypes.LOAD_BOARD:
            return state;
        case ActionTypes.LOAD_BOARD_SUCCESS:
            let alld = (<LoadBoardSuccessAction>action).payload;
            return loadAllDigits(state, alld);
        case ActionTypes.SWAP_MUTED:
            return Object.assign({}, {
                allDigits: state.allDigits, nextNumber: state.nextNumber,
                previousNumber: state.previousNumber, pending: state.pending, muted: !state.muted
            });
        default:
            return state;
    }
}

function loadAllDigits(state: any, alld: number[]) {
    let newArr = initAllDigits();
    for (let index = 0; index < alld.length; index++) {
        newArr[alld[index] - 1] = { id: alld[index], noSelected: true };
    }
    return Object.assign({}, {
        allDigits: newArr, nextNumber: state.nextNumber,
        previousNumber: state.previousNumber, pending: false, muted: state.muted
    });
}

function initAllDigits() {
    let allDigits: BoardModel[] = [];
    for (let index = 0; index < 90; index++) {
        allDigits[index] = { id: index + 1, noSelected: false };
    }
    return allDigits;
}

function populateNext(state: any, next: number) {
    let adigi = state.allDigits.slice();
    adigi[next - 1] = { id: next, noSelected: true };
    let preNum = state.nextNumber;
    return Object.assign({}, {
        allDigits: adigi, nextNumber: next,
        previousNumber: preNum, pending: false, muted: state.muted
    });
}
