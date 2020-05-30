import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { ChangePendingAction, WSNextActionSuccessAction } from './actions/board.actions';
import { AppConstants } from './AppConstants';
import { getActiveGameId, State } from './application.state';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class WebSocketAPI {
    webSocketEndPoint: string = AppConstants.REAL_SERVER_URL + "/gs-guide-websocket";
    gameId: string;
    topic1: string = "/topic/";
    topic2: string = "/newNumber";
    topic: string;
    sadd1: string = "/housie/";
    sadd2: string = "/next"
    serverAddr: string;
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

    markPending(pend) {
        this._store.dispatch(new ChangePendingAction(pend));
    }

    changeGameId() {
        this.topic = this.topic1 + this.currentGame + this.topic2;
        this.serverAddr = this.sadd1 + this.currentGame + this.sadd2;
        console.log("topic=" + this.topic);
        console.log("server=" + this.serverAddr);
    }
}