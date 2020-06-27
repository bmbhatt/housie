import { Action } from '@ngrx/store';
import { HousieModel } from './../models/housie.model';


export const ADD_GAME = '[HOUSIE] Add';
export const REMOVE_GAME = '[HOUSIE] Remove';
export const LOAD_GAMES = '[HOUSIE] Load Games';
export const SELECT_GAME = '[HOUSIE] Select Game';
export const GOT_CHEAT_GAME = '[HOUSIE] Got Cheat Game';
export const GET_CHEAT_GAME = '[HOUSIE] Get Cheat Game';
export const GET_CHEAT_GAME_SUCCESS = '[HOUSIE] Get Cheat Game Success';

export class AddGame implements Action {
    readonly type = ADD_GAME;

    constructor(public payload: HousieModel) { }
}

export class RemoveGame implements Action {
    readonly type = REMOVE_GAME;

    constructor(public payload: number) { }
}

export class LoadGames implements Action {
    readonly type = LOAD_GAMES;

    constructor(public payload: number[]) { }
}

export class SelectGame implements Action {
    readonly type = SELECT_GAME;

    constructor(public payload: number) { }
}

export class WSGotCheatNoActionSuccessAction implements Action {
    readonly type = GOT_CHEAT_GAME;

    constructor(public payload: number) { }
}

export class GetCheatNoAction implements Action {
    readonly type = GET_CHEAT_GAME;
}

export class GetCheatNoSuccessAction implements Action {
    readonly type = GET_CHEAT_GAME_SUCCESS;

    constructor(public payload: number) { }
}

export type Actions = AddGame | RemoveGame | LoadGames 
| SelectGame | WSGotCheatNoActionSuccessAction | GetCheatNoAction | GetCheatNoSuccessAction;