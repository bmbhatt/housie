import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, merge } from 'rxjs';
import { map, catchError, startWith } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { TicketRow } from './tickets/tickets.component';
import { AppConstants } from './AppConstants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    
    let errorMessage = 'Unknow Error!';
    if(error.error instanceof ErrorEvent) {
      // client side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest() {
    return this.httpClient.get(AppConstants.SERVER_URL);
  }

  public getNewNumber() {
    return this.httpClient.get(AppConstants.REAL_SERVER_URL);
  }

  public getAll() {
    return this.httpClient.get(AppConstants.REAL_SERVER_URL + "/all");
  }

  public reset() {
    return this.httpClient.get(AppConstants.REAL_SERVER_URL+"/reset");
  }

  public previous() {
    return this.httpClient.get(AppConstants.REAL_SERVER_URL+"/previous");
  }

  public current() {
    return this.httpClient.get(AppConstants.REAL_SERVER_URL+"/current");
  }

  public tickets() {
    return this.httpClient.get(AppConstants.REAL_SERVER_URL+"/ticket");
  }

  public generateTicket(dataSource) {
    merge().pipe(startWith({}),
          switchMap(()=>{
            return this.httpClient.get<TicketRow>(AppConstants.REAL_SERVER_URL+"/ticket");
          }),
          map(data => {
            return data;
          }),
          catchError(() => {
            return of([]);
          })
        ).subscribe((ticketNumbers: any[]) => {
          let allTicketNos = new Array(3);
          for (let index = 0, c = 0; index < ticketNumbers.length; index+=9) {
            allTicketNos[c] = { 'num1': ticketNumbers[index], 
            'num2': ticketNumbers[index + 1],
            'num3': ticketNumbers[index + 2],
            'num4': ticketNumbers[index + 3],
            'num5': ticketNumbers[index + 4],
            'num6': ticketNumbers[index + 5],
            'num7': ticketNumbers[index + 6],
            'num8': ticketNumbers[index + 7],
            'num9': ticketNumbers[index + 8] };
            c++;
          }
          console.log(allTicketNos);
          dataSource.data = allTicketNos;
        });
    
  }

}
