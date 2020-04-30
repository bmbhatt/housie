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
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            })
        }, this.errorCallBack);
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

    errorCallBack(error) {
        console.log("errorCallBack -> " + error);
        setTimeout(() => {
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
}