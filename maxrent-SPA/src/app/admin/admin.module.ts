import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesChartComponent } from './expenses/expenses-chart/expenses-chart.component';
import { ProfitChartComponent } from './profit-chart/profit-chart.component';
import {TimeAgoPipe} from 'time-ago-pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap';
import { AssetListComponent } from './product-assets/asset-list/asset-list.component';
import { AllOrdersViewComponent } from './orders/all-orders-view/all-orders-view.component';
import { AssetDetailComponent } from './product-assets/asset-detail/asset-detail.component';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import { AddExpenseComponent } from './expenses/add-expense/add-expense.component';
import * as Material from '@angular/material';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    MatDialogModule,
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatCheckboxModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatDialogModule,
    PaginationModule.forRoot()

  ],
  declarations: [
    ExpensesChartComponent,
    ProfitChartComponent,
    AssetListComponent,
    AssetDetailComponent,
    AddExpenseComponent,
    AllOrdersViewComponent,
    TimeAgoPipe
  ],
  entryComponents: [ AddExpenseComponent ]
})
export class AdminModule { }
