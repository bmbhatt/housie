import { ActionReducerMap, createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { housieReducer } from './reducers/housie.reducer';
import { BoardState } from './board/board.state';
import { boardReducer } from './reducers/board.reducer';

export interface State {
    app: AppState;
    board: BoardState;
}

export const reducers: ActionReducerMap<State> = {
    app: housieReducer,
    board: boardReducer
}

export const getAllGames = createSelector(
    (state: State) => state.app,
    (state: AppState) => state.allGames
);

export const getActiveGameId = createSelector(
    (state: State) => state.app,
    (state: AppState) => state.activeGameId
);

export const getAllDigits = createSelector(
    (state: State) => state.board,
    (state: BoardState) => state.allDigits
);

export const getNextNumber = createSelector(
    (state: State) => state.board,
    (state: BoardState) => state.nextNumber
);

export const getPreviousNumber = createSelector(
    (state: State) => state.board,
    (state: BoardState) => state.previousNumber
);

export const getPending = createSelector(
    (state: State) => state.board,
    (state: BoardState) => state.pending
);

export const getMuted = createSelector(
    (state: State) => state.board,
    (state: BoardState) => state.muted
);
