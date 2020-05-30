import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { LoadBoardAction, WSConnectAction } from '../actions/board.actions';
import * as HousieActions from '../actions/housie.actions';
import { State } from '../application.state';


@Injectable()
export class HousieEffects {

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
        private _store: Store<State>) { }

}