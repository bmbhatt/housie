import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LoadBoardAction, WSConnectAction } from '../actions/board.actions';
import * as HousieActions from '../actions/housie.actions';
import { ApiService } from '../api.service';
import { State } from '../application.state';


@Injectable()
export class HousieEffects {

    getTicketNo$ = createEffect(() => this.actions$.pipe(
        ofType(HousieActions.GET_CHEAT_GAME),
        switchMap(() => this.apiService.getCheatTicketNo()
            .pipe(
                map((num: number) => new HousieActions.GetCheatNoSuccessAction(num)),
                catchError(() => EMPTY)
            ))
    )
    );

    getAllGame$ = createEffect(() => this.actions$.pipe(
        ofType(HousieActions.LOAD_GAMES),
        tap(() => {
            this._store.dispatch(new LoadBoardAction());
            this._store.dispatch(new WSConnectAction());
        })
    ),
        { dispatch: false }
    );

    newGame$ = createEffect(() => this.actions$.pipe(
        ofType(HousieActions.ADD_GAME),
        tap(() => {
            this._store.dispatch(new LoadBoardAction());
            this._store.dispatch(new WSConnectAction());
        })
    ),
        { dispatch: false }
    );

    changeGame$ = createEffect(() => this.actions$.pipe(
        ofType(HousieActions.SELECT_GAME),
        tap(() => {
            this._store.dispatch(new LoadBoardAction());
            this._store.dispatch(new WSConnectAction());
        })
    ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private _store: Store<State>,
        private apiService: ApiService) { }

}