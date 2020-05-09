import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { WebSocketAPI } from '../WebSocketAPI';
import { SpeechSynthesizerService } from '../speech-synthesizer.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {

  nextNumber: any;
  muted: boolean = false;
  pending: boolean = true;
  previousNumber: any;
  start: any;
  allNumbers = [];
  allDigits = new Array(90);

  webSocketAPI: WebSocketAPI;

  constructor(private apiService: ApiService,
    private confirmationDialogService: ConfirmationDialogService,
    private speechSynthesizer: SpeechSynthesizerService) {
    this.initAllDigits();
  }

  ngOnInit(): void {
    this.pending=true;
    this.webSocketAPI = new WebSocketAPI(this);
    this.getall();
  }

  ngOnDestroy() {
    console.log("ondestroy called.")
  }

  mute() {
    if(this.muted)
      this.muted = false;
    else
      this.muted = true;
  }

  getall(): void {
    this.connect();
    this.fetchAll();
    this.currentNum();
    this.previousNum();
  }

  fetchAll(): void {
    this.apiService.getAll().subscribe((allN: any[]) => {
      console.log("all numbers = " + allN);
      this.allNumbers = allN;
      for (let index = 0; index < this.allNumbers.length; index++) {
        this.allDigits[this.allNumbers[index] - 1] = { 'id': this.allNumbers[index], 'selected': true };
      }
    });
  }

  nextNum(): void {
    this.previousNumber = this.nextNumber;
    this.apiService.getNewNumber().subscribe((num: any) => {
      console.log("number retrieved = " + num);
      if(!this.muted) {
        var spMsg = this.parap(num);
        this.speechSynthesizer.speak(spMsg, 'en-US');
      }
      this.nextNumber = num;
      this.allDigits[this.nextNumber - 1] = { 'id': this.nextNumber, 'selected': true };
    });
  }

  parap(num) {
    var msg;
    var one = Math.floor(num / 10);
    var two = num % 10;
    if(one === 0) {
      msg = 'only number ' + this.now(two);
    } else {
      msg = this.now(one) + ' ' + this.now(two) + ' ' + num;
    }
    return msg;
  }

  now(no) {
    switch(no) {
      case 1: return "one";
      case 2: return "two";
      case 3: return "three";
      case 4: return "four";
      case 5: return "five";
      case 6: return "six";
      case 7: return "seven";
      case 8: return "eight";
      case 9: return "nine";
      case 0: return "zero";
    }
  }

  reset(): void {
    this.apiService.reset().subscribe();
    this.allNumbers = [];
    this.initAllDigits();
    this.nextNumber = 0;
    this.previousNumber = 0;
  }

  initAllDigits(): void {
    for (let index = 0; index < this.allDigits.length; index++) {
      this.allDigits[index] = { 'id': index + 1, 'selected': false };
    }
  }

  currentNum(): void {
    this.apiService.current().subscribe((num: any) => {
      this.nextNumber = num;
      console.log("Current no ...."+num);
      this.allDigits[this.nextNumber - 1] = { 'id': this.nextNumber, 'selected': true };
    });
  }

  previousNum(): void {
    this.apiService.previous().subscribe((num: any) => {
      this.previousNumber = num;
    });
  }

  openConfirmationDialog() {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to Restart ?')
    .then((confirmed) => {
      console.log('User confirmed:', confirmed);
      if(confirmed)
        this.reset();
    }).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  /*
  WebSocket Functions
  */

connect(){
  this.webSocketAPI._connect();
}

disconnect(){
  this.webSocketAPI._disconnect();
}

wsAskForNextNumber(){
  this.webSocketAPI._send("");
}

wsProcessNextNumberResponse(message){
    if(!this.muted) {
      var spMsg = this.parap(message);
      this.speechSynthesizer.speak(spMsg, 'en-US');
    }
    this.previousNumber = this.nextNumber;
    this.nextNumber = message;
    this.allDigits[this.nextNumber - 1] = { 'id': this.nextNumber, 'selected': true };
}

markPending(pend) {
  if(!pend) {
    this.previousNum();
    this.currentNum();
    this.fetchAll();
  }
  this.pending=pend;
}
}
