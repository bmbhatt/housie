import { BoardModel } from '../models/game.model';

export class BoardState {
    static readonly default: BoardState = Object.seal({
        nextNumber: 0,
        previousNumber: 0,
        allDigits: [],
        pending: true,
        muted: true
    });
    nextNumber: Number;
    previousNumber: Number;
    allDigits: BoardModel[];
    pending: Boolean;
    muted: Boolean;
}
