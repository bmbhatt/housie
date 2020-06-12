import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { catchError, distinctUntilChanged, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ActionTypes, GetCurrentNumberAction, GetPreviousNumberAction, LoadBoardSuccessAction } from '../actions/board.actions';
import { ApiService } from '../api.service';
import { getMuted, getNextNumber, State } from '../application.state';
import { SpeechSynthesizerService } from '../speech-synthesizer.service';
import { WebSocketAPI } from '../WebSocketAPI';

@Injectable()
export class BoardEffects {

    loadBoard$ = createEffect(() => this.actions$.pipe(
        ofType(ActionTypes.LOAD_BOARD),
        switchMap(() => this.apiService.getAll()
            .pipe(
                map((nums: number[]) => new LoadBoardSuccessAction(nums)),
                catchError(() => of({ type: ActionTypes.RESET_BOARD_FAILURE }))
            ))
    )
    );

    currentNum$ = createEffect(() => this.actions$.pipe(
        ofType(ActionTypes.LOAD_BOARD_SUCCESS),
        switchMap(() => this.apiService.current()
            .pipe(
                map((num: number) => new GetCurrentNumberAction(num)),
                catchError(() => EMPTY)
            ))
    )
    );

    previousNum$ = createEffect(() => this.actions$.pipe(
        ofType(ActionTypes.LOAD_BOARD_SUCCESS),
        switchMap(() => this.apiService.previous()
            .pipe(
                map((num: number) => new GetPreviousNumberAction(num)),
                catchError(() => EMPTY)
            ))
    )
    );

    resetBoard$ = createEffect(() => this.actions$.pipe(
        ofType(ActionTypes.RESET_BOARD),
        switchMap(() => this.apiService.reset()
            .pipe(
                map(() => ({ type: ActionTypes.RESET_BOARD_SUCCESS, payload: {} })),
                catchError(() => of({ type: ActionTypes.RESET_BOARD_FAILURE }))
            ))
    )
    );

    connect$ = createEffect(() => this.actions$.pipe(
        ofType(ActionTypes.WS_CONNECT),
        tap(() => this.webSocketApi._connect())
    ),
        { dispatch: false }
    );

    disconnect$ = createEffect(() => this.actions$.pipe(
        ofType(ActionTypes.WS_DISCONNECT),
        tap(() => this.webSocketApi._disconnect())
    ),
        { dispatch: false }
    );

    wsNext$ = createEffect(() => this.actions$.pipe(
        ofType(ActionTypes.WS_NEXT),
        tap(() => this.webSocketApi._send(""))
    ),
        { dispatch: false }
    );

    wsNextSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(ActionTypes.WS_NEXT_SUCCESS),
        withLatestFrom(
            this._store.pipe(select(getNextNumber), distinctUntilChanged()),
            this._store.pipe(select(getMuted), distinctUntilChanged())
        ),
        tap(([a, nextno, muted]) => {
            if (!muted) {
                var spMsg = this.speechSynthesizer.parap(nextno);
                this.speechSynthesizer.speak(spMsg, 'en-US');
            }
        })
    ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private webSocketApi: WebSocketAPI,
        private speechSynthesizer: SpeechSynthesizerService,
        private _store: Store<State>) { }
}