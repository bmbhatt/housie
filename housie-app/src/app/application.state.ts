import { ActionReducerMap, createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { housieReducer } from './reducers/housie.reducer';

export interface State {
    app: AppState;
}

export const reducers: ActionReducerMap<State> = {
    app: housieReducer
}

export const getAllGames = createSelector(
    (state: State) => state.app,
    (state: AppState) => state.allGames
);

export const getActiveGameId = createSelector(
    (state: State) => state.app,
    (state: AppState) => state.activeGameId
);
