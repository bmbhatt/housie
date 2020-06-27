import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { getActiveGameId, getAllGames, State, getCheatTicketNo } from './application.state';
import { GameService } from './game.service';
import { HousieModel } from './models/housie.model';
import { WebSocketAPI } from './WebSocketAPI';
import { GetCheatNoAction } from './actions/housie.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'housie-app';
  gameId: Number = 1;
  allGames: Observable<HousieModel[]> = this._store.pipe(select(getAllGames), distinctUntilChanged());
  activeGameId: Observable<Number> = this._store.pipe(select(getActiveGameId), distinctUntilChanged());
  cheatTicketNo: Observable<Number> = this._store.pipe(select(getCheatTicketNo), distinctUntilChanged());

  constructor(public gameService: GameService,
      private _store: Store<State>) {
    this.activeGameId.subscribe((gId)=> this.gameId = gId);
  }

  ngOnInit() {
    this.gameService.getAllGames();
    this._store.dispatch(new GetCheatNoAction());
  }

  newGame() {
    this.gameService.newGame();
  }

  changeGame(value) {
    this.gameService.selectGame(value);
  }
}
