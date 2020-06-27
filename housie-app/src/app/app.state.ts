import { HousieModel } from './models/housie.model';

export class AppState {
    static readonly default: AppState = Object.seal({
        allGames: [],
        activeGameId: 1,
        cheatTicketNo: 0
    });
    allGames: HousieModel[];
    activeGameId: number;
    cheatTicketNo: number;
}
