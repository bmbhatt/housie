import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { ChangePendingAction, WSNextActionSuccessAction } from './actions/board.actions';
import { AppConstants } from './AppConstants';
import { getActiveGameId, State } from './application.state';
import { Injectable } from '@angular/core';
import { WSGotCheatNoActionSuccessAction } from './actions/housie.actions';


@Injectable({
    providedIn: 'root'
})
export class WebSocketAPI {
    webSocketEndPoint: string = AppConstants.REAL_SERVER_URL + "/gs-guide-websocket";
    gameId: string;
    topic1: string = "/topic/";
    topic2: string = "/newNumber";
    topic: string;
    housieRoot: string = "/housie/";
    sadd2: string = "/next";

    getcheat: string = "/getwscheat";
    cheat1: string = "/topic/";
    cheat2: string = "/cheatTicketNo";
    cheatAddrWhereServerWillSendResponse: string;
    serverAddr: string;
    cheatCallingServerAddress: string;
    stompClient: any;
    activeGameId: Observable<Number> = this._store.pipe(select(getActiveGameId), distinctUntilChanged());
    currentGame: Number;

    constructor(private _store: Store<State>) {
        this.currentGame = 1;
        this.activeGameId.subscribe((activeGameId) => {
            this.currentGame = activeGameId;
            console.log("state changed....." + this.currentGame);
            this.changeGameId();
        });
        this.changeGameId();
    }

    _connect() {
        console.log("Initiazing web socket connection....");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        this.stompClient.connect({}, (frame) => {
            this.successCallback();
        }, () => {
            this.reconnect(this.webSocketEndPoint, this.successCallback);
        });
    }

    successCallback() {
        console.log("Connected.....");
        this.markPending(false);
        this.subscribeToPublisher();
    }

    subscribeToPublisher() {
        const _this = this;
        _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
            _this.onMessageReceived(sdkEvent);
        });
        _this.stompClient.subscribe(_this.cheatAddrWhereServerWillSendResponse, function (sdkEvent) {
            _this.onMessageReceivedForCheatTicketNo(sdkEvent);
        });
    }

    _isConnected() {
        return this.stompClient != null;
    }

    _disconnect() {
        if (this.stompClient != null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnect");
    }

    reconnect(socketUrl, successCallback) {
        let connected = false;
        let reconInv = setInterval(() => {
            let ws = new SockJS(this.webSocketEndPoint);
            this.stompClient = Stomp.over(ws);
            this.stompClient.connect({}, (frame) => {
                clearInterval(reconInv);
                connected = true;
                successCallback();
            }, () => {
                if (connected) {
                    this.reconnect(socketUrl, successCallback);
                }
            });
        }, 10000);
    }

    errorCallBack(error) {
        console.log("errorCallBack -> " + error);
        setTimeout(() => {
            this.markPending(true);
            this._connect();
        }, 5000);
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    _send(message) {
        console.log("calling send via web socket");
        this.stompClient.send(this.serverAddr, {}, JSON.stringify(message));
    }

    onMessageReceived(message) {
        let no = +(message.body);
        this._store.dispatch(new WSNextActionSuccessAction(no));
    }

    _sendForCheatTicketNo(message) {
        console.log("calling cheat via web socket");
        this.stompClient.send(this.cheatCallingServerAddress, {}, JSON.stringify(message));
    }

    onMessageReceivedForCheatTicketNo(message) {
        let no = +(message.body);
        this._store.dispatch(new WSGotCheatNoActionSuccessAction(no));
    }

    markPending(pend) {
        this._store.dispatch(new ChangePendingAction(pend));
    }

    changeGameId() {
        this.topic = this.topic1 + this.currentGame + this.topic2;
        this.serverAddr = this.housieRoot + this.currentGame + this.sadd2;
        this.cheatCallingServerAddress = this.housieRoot + this.currentGame + this.getcheat;
        this.cheatAddrWhereServerWillSendResponse = this.cheat1 + this.currentGame + this.cheat2;
        console.log("topic=" + this.topic);
        console.log("server=" + this.serverAddr);
        console.log("cheatAddrWhereServerWillSendResponse=" + this.cheatAddrWhereServerWillSendResponse);
        console.log("cheatCallingServerAddress=" + this.cheatCallingServerAddress);
    }
}