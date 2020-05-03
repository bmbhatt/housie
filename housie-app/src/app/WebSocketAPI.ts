import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { BoardComponent } from './board/board.component';
import { ApiService } from './api.service';
import { AppConstants } from './AppConstants';


export class WebSocketAPI {
    webSocketEndPoint: string = AppConstants.REAL_SERVER_URL + "/gs-guide-websocket";
    topic: string = "/topic/newNumber";
    stompClient: any;
    boardComponent: BoardComponent;

    constructor(boardComponent: BoardComponent) {
        this.boardComponent = boardComponent;
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
        const _this = this;
        _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
            _this.onMessageReceived(sdkEvent);
        })
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
        this.stompClient.send("/housie/next", {}, JSON.stringify(message));
    }

    onMessageReceived(message) {
        this.boardComponent.wsProcessNextNumberResponse(message.body);
    }

    markPending(pend) {
        this.boardComponent.markPending(pend);
    }
}