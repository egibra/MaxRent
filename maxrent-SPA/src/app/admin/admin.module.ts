import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseCardComponent } from './expenses/expense-card/expense-card.component';
import { ExpensesChartComponent } from './expenses/expenses-chart/expenses-chart.component';
import { ProfitChartComponent } from './profit-chart/profit-chart.component';
import { ExpensesListComponent } from './expenses/expenses-list/expenses-list.component';
import {TimeAgoPipe} from 'time-ago-pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    PaginationModule.forRoot()

  ],
  declarations: [
    ExpenseCardComponent,
    ExpensesChartComponent,
    ProfitChartComponent,
    ExpensesListComponent,
    TimeAgoPipe
  ]
})
export class AdminModule { }
