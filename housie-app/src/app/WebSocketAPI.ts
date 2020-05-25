import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { AppConstants } from './AppConstants';
import { BoardComponent } from './board/board.component';
import { Store, select } from '@ngrx/store';
import { State, getActiveGameId } from './application.state';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';


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
    boardComponent: BoardComponent;
    activeGameId: Observable<Number> = this._store.pipe(select(getActiveGameId), distinctUntilChanged());
    currentGame: Number;

    constructor(boardComponent: BoardComponent, private initialGameId: Number, private _store: Store<State>) {
        this.boardComponent = boardComponent;
        this.currentGame = initialGameId;
        this.activeGameId.subscribe((activeGameId)=>{
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
        if(this.stompClient != null) {
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
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    _send(message) {
        console.log("calling send via web socket");
        this.stompClient.send(this.serverAddr, {}, JSON.stringify(message));
    }

    onMessageReceived(message) {
        this.boardComponent.wsProcessNextNumberResponse(message.body);
    }

    markPending(pend) {
        this.boardComponent.markPending(pend);
    }

    changeGameId() {
        this.topic = this.topic1 + this.currentGame + this.topic2;
        this.serverAddr = this.sadd1 + this.currentGame + this.sadd2;
        console.log("topic="+this.topic);
        console.log("server="+this.serverAddr);
    }
}