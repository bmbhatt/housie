import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import * as TicketActions from '../actions/ticket.actions';
import { ApiService } from '../api.service';
import { getTicketId, State, getTickets } from '../application.state';
import { MatTableDataSource } from '@angular/material/table';
import { TicketModel } from '../models/ticket.model';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  displayedColumns: string[] = ['col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7', 'col8', 'col9'];
  ticketNumbers: any;
  dataSource = new MatTableDataSource();
  ticketId$: Observable<Number> = this._store.pipe(select(getTicketId), distinctUntilChanged());

  constructor(private apiService: ApiService,
    private _store: Store<State>) { }

  ngOnInit(): void {
    this._store.pipe(select(getTickets), distinctUntilChanged()).subscribe((data)=>{
      if(data != null)
        this.dataSource.data = data.data;
    });
  }

  // getAllRecords() {
  //   this.apiService.generateTicket(this.dataSource, this.ticketId);
  // }

  genTicket() {
    this.apiService.genTicket().subscribe((data: any) => {
      this._store.dispatch(new TicketActions.GenerateTicketAction(data));
    });
  }

}
