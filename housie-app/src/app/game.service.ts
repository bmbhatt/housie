import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import * as HousieActions from './actions/housie.actions';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    currentGameId: any;

    constructor(private apiService: ApiService, private state: Store<AppState>) {
    }

    newGame() {
        this.apiService.newGame().subscribe((gid: any) => {
            this.currentGameId = gid;
            this.state.dispatch(new HousieActions.AddGame({ gameId: this.currentGameId, gameStatus: 'on' }));
        });
    }

    getAllGames() {
        this.apiService.getAllGames().subscribe((gameIds: number[]) => {
            this.state.dispatch(new HousieActions.LoadGames(gameIds));
        });
    }

    selectGame(gameId: number) {
        this.state.dispatch(new HousieActions.SelectGame(gameId));
    }

}