import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { merge, Observable, of, throwError } from 'rxjs';
import { catchError, map, startWith, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { AppConstants } from './AppConstants';
import { State, getActiveGameId } from './application.state';
import { TicketRow } from './tickets/tickets.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  activeGameId: Observable<Number> = this._store.pipe(select(getActiveGameId), distinctUntilChanged());
  currentGame: Number = 1;

  constructor(private httpClient: HttpClient, private _store: Store<State>) { 
    this.activeGameId.subscribe((activeId)=>{
      this.currentGame = activeId;
    });
  }

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
    return this.httpClient.get(AppConstants.REAL_SERVER_URL+"/"+this.currentGame);
  }

  public getAll() {
    return this.httpClient.get(AppConstants.REAL_SERVER_URL +"/"+this.currentGame+ "/all");
  }

  public reset() {
    return this.httpClient.get(AppConstants.REAL_SERVER_URL+"/"+this.currentGame+"/reset");
  }

  public previous() {
    return this.httpClient.get(AppConstants.REAL_SERVER_URL+"/"+this.currentGame+"/previous");
  }

  public current() {
    return this.httpClient.get(AppConstants.REAL_SERVER_URL+"/"+this.currentGame+"/current");
  }

  public tickets() {
    return this.httpClient.get(AppConstants.REAL_SERVER_URL+"/ticket");
  }

  public checkIfBoardIsReset() {
    return this.httpClient.get(AppConstants.REAL_SERVER_URL+"/"+this.currentGame+"/ifBoardReset");
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

  public newGame() {
    return this.httpClient.get(AppConstants.REAL_SERVER_URL+"/newgame");
  }

  public getAllGames() {
    return this.httpClient.get(AppConstants.REAL_SERVER_URL+"/getallgames");
  }

  public finishGame() {
    return this.httpClient.get(AppConstants.REAL_SERVER_URL+"/finishgame");
  }

}
