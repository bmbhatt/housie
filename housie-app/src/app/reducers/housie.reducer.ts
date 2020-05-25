import * as HousieActions from './../actions/housie.actions';
import { HousieModel } from './../models/housie.model';
import { AppState } from '../app.state';

const initialState: HousieModel = {
    gameId: 1,
    gameStatus: 'On'
}

export function housieReducer(state = AppState.default, action: HousieActions.Actions) {
    switch (action.type) {
        case HousieActions.ADD_GAME:
            return addGame(state, action.payload);
        case HousieActions.LOAD_GAMES:
            return loadGames(state, action.payload);
        case HousieActions.SELECT_GAME:
            return selectGame(state, action.payload);
        case HousieActions.REMOVE_GAME:
            return removeGame(state, action.payload);
        default:
            return state;
    }
}

function addGame(state: any, newGame: HousieModel) {
    let games = state.allGames.slice();
    games.push(newGame);
    return Object.assign({}, {
        allGames: games, activeGameId: newGame.gameId
    });
}

function selectGame(state: any, num: number) {
    let allGames = state.allGames.slice();
    for (let index = 0; index < allGames.length; index++) {
        const game = allGames[index];
        if (game.gameId === num) {
            allGames.splice(index, 1, { gameId: game.gameId, gameStatus: game.gameStatus });
        }
    }
    return Object.assign({}, {
        allGames: allGames, activeGameId: num
    });
}

function loadGames(state: AppState, nums: number[]) {
    let ag = state.allGames.slice();
    nums.forEach((num) => {
        ag.push({ gameId: num, gameStatus: 'On' });
    });
    return Object.assign({}, state, {
        allGames: ag, activeGameId: 1
    });
}

function removeGame(state: AppState, gameId: number) {
    let ag = state.allGames.slice();
    ag.splice(gameId, 1);
    return Object.assign({}, state, {
        allGames: ag, activeGameId: state.activeGameId
    });
}