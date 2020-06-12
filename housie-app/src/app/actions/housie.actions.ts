import { Action } from '@ngrx/store';
import { HousieModel } from './../models/housie.model';


export const ADD_GAME = '[HOUSIE] Add';
export const REMOVE_GAME = '[HOUSIE] Remove';
export const LOAD_GAMES = '[HOUSIE] Load Games';
export const SELECT_GAME = '[HOUSIE] Select Game';

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

export type Actions = AddGame | RemoveGame | LoadGames | SelectGame;