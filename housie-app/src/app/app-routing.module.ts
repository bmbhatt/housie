import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BoardComponent } from './board/board.component';
import { TicketsComponent } from './tickets/tickets.component';


const routes: Routes = [
  { path: '', redirectTo: 'board', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'board', component: BoardComponent },
  { path: 'tickets', component: TicketsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
