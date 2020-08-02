import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, timer } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ResetBoardAction, SwapMuteAction, WSNextAction } from '../actions/board.actions';
import { ApiService } from '../api.service';
import { getActiveGameId, getAllDigits, getMuted, getNextNumber, getPending, getPreviousNumber, State } from '../application.state';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { BoardModel } from '../models/game.model';
import { WebSocketAPI } from '../WebSocketAPI';
import { Location } from '@angular/common';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {

  nextNumber: Observable<Number> = this._store.pipe(select(getNextNumber), distinctUntilChanged());
  muted: Observable<Boolean> = this._store.pipe(select(getMuted), distinctUntilChanged());
  pending: Observable<Boolean> = this._store.pipe(select(getPending), distinctUntilChanged());
  previousNumber: Observable<Number> = this._store.pipe(select(getPreviousNumber), distinctUntilChanged());
  start: any;
  allNumbers = [];
  allDigits: Observable<BoardModel[]> = this._store.pipe(select(getAllDigits), distinctUntilChanged());
  activeGameId: Observable<Number> = this._store.pipe(select(getActiveGameId), distinctUntilChanged());
  subscription; Subscription;

  constructor(private apiService: ApiService,
    private confirmationDialogService: ConfirmationDialogService,
    private webSocketAPI: WebSocketAPI,
    private _store: Store<State>,
    private location: Location) {
  }

  ngOnInit(): void {
    this.subscription = timer(10000, 10000).pipe(
      switchMap(() => this.apiService.checkIfBoardIsReset())
    ).subscribe((gameReset: boolean) => {
      // if(gameReset)
      //   location.reload();
    });
  }

  ngOnDestroy() {
    // console.log("ondestroy called.");
    // this.webSocketAPI._disconnect();
  }

  mute() {
    this._store.dispatch(new SwapMuteAction());
  }

  checkIfBoardIsReset(): void {
    this.apiService.checkIfBoardIsReset();
  }

  reset(): void {
    this._store.dispatch(new ResetBoardAction());
  }

  openConfirmationDialog() {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to Restart ?')
      .then((confirmed) => {
        console.log('User confirmed:', confirmed);
        if (confirmed)
          this.reset();
      }).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  /*
  WebSocket Functions
  */

  wsAskForNextNumber() {
    this._store.dispatch(new WSNextAction());
  }

}
