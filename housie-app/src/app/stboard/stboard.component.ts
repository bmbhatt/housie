import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { SpeechSynthesizerService } from '../speech-synthesizer.service';

@Component({
  selector: 'app-stboard',
  templateUrl: './stboard.component.html',
  styleUrls: ['./stboard.component.css']
})
export class StboardComponent implements OnInit {

  muted: boolean = false;
  nextNumber: any;
  pending: boolean = true;
  previousNumber: any;
  start: any;
  allNumbers = [];
  allDigits = new Array(90);

  constructor(private apiService: ApiService, 
    private confirmationDialogService: ConfirmationDialogService,
    private speechSynthesizer: SpeechSynthesizerService) {
    this.initAllDigits();
  }

  ngOnInit(): void {
    this.getall();
    this.pending=true;
  }

  getall(): void {
    this.fetchAll();
    this.currentNum();
    this.previousNum();
  }

  mute() {
    if(this.muted)
      this.muted = false;
    else
      this.muted = true;
  }

  fetchAll(): void {
    this.apiService.getAll().subscribe((allN: any[]) => {
      console.log("all numbers = " + allN);
      this.allNumbers = allN;
      for (let index = 0; index < this.allNumbers.length; index++) {
        this.allDigits[this.allNumbers[index] - 1] = { 'id': this.allNumbers[index], 'selected': true };
      }
      this.pending=false;
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
}
