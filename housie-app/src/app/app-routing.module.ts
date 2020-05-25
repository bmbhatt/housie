import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BoardComponent } from './board/board.component';
import { HomeComponent } from './home/home.component';
import { TicketsComponent } from './tickets/tickets.component';


const routes: Routes = [
  { path: '', redirectTo: 'stboard', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'board', component: BoardComponent },
  { path: 'tickets', component: TicketsComponent },
  { path: 'stboard', component: BoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
