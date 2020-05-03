import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-stboard',
  templateUrl: './stboard.component.html',
  styleUrls: ['./stboard.component.css']
})
export class StboardComponent implements OnInit {

  nextNumber: any;
  pending: boolean = true;
  previousNumber: any;
  start: any;
  allNumbers = [];
  allDigits = new Array(90);

  constructor(private apiService: ApiService, private confirmationDialogService: ConfirmationDialogService) {
    this.initAllDigits();
  }

  ngOnInit(): void {
    this.fetchAll();
    this.currentNum();
    this.previousNum();
    this.pending=true;
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
      this.nextNumber = num;
      this.allDigits[this.nextNumber - 1] = { 'id': this.nextNumber, 'selected': true };
    });
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
