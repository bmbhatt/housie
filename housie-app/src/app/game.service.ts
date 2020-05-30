import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as HousieActions from './actions/housie.actions';
import { ApiService } from './api.service';
import { AppState } from './app.state';
import { WebSocketAPI } from './WebSocketAPI';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    currentGameId: any;

    constructor(private apiService: ApiService, private state: Store<AppState>,
        private webSocketApi: WebSocketAPI) {
    }

    newGame() {
        this.webSocketApi._disconnect();
        this.apiService.newGame().subscribe((gid: any) => {
            this.currentGameId = gid;
            this.state.dispatch(new HousieActions.AddGame({ gameId: this.currentGameId, gameStatus: 'on' }));
        });
    }

    getAllGames() {
        this.webSocketApi._disconnect();
        this.apiService.getAllGames().subscribe((gameIds: number[]) => {
            this.state.dispatch(new HousieActions.LoadGames(gameIds));
        });
    }

    selectGame(gameId: number) {
        this.webSocketApi._disconnect();
        this.state.dispatch(new HousieActions.SelectGame(gameId));
    }

}