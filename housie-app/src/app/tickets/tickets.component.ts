import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatTableDataSource } from '@angular/material/table';

export class TicketRow {
  num1: number;
  num2: number;
  num3: number;
  num4: number;
  num5: number;
  num6: number;
  num7: number;
  num8: number;
  num9: number;
}

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  allTicketNos: TicketRow[] = [new TicketRow(), new TicketRow(), new TicketRow()];
  displayedColumns: string[] = ['col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7', 'col8', 'col9'];
  ticketNumbers: any;
  dataSource = new MatTableDataSource();

  constructor(private apiService: ApiService) {   }

  ngOnInit(): void {
  }

  generateTicket() {
    this.apiService.tickets().subscribe((numbers: any) => {
      this.ticketNumbers = numbers;
      console.log(this.ticketNumbers);
      for (let index = 0, c = 0; index < this.ticketNumbers.length; index+=9) {
        this.allTicketNos[c] = { 'num1': this.ticketNumbers[index], 
        'num2': this.ticketNumbers[index + 2],
        'num3': this.ticketNumbers[index + 3],
        'num4': this.ticketNumbers[index + 4],
        'num5': this.ticketNumbers[index + 5],
        'num6': this.ticketNumbers[index + 6],
        'num7': this.ticketNumbers[index + 7],
        'num8': this.ticketNumbers[index + 8],
        'num9': this.ticketNumbers[index + 9] };
        c++;
      }
      console.log(this.allTicketNos);
    });
  }

  getAllRecords() {
    this.apiService.generateTicket(this.dataSource);
  }

}
