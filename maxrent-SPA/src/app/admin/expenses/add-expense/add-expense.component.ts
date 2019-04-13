import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AssetsService } from 'src/app/_services/assets/assets.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import { AssetForAdminListView } from 'src/app/_models/asset-models/asset-for-admin-list-view';
import { IMultiSelectSettings, IMultiSelectTexts, IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ExpensesService } from 'src/app/_services/expenses/expenses.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {

  selectedItems = [];
  dropdownSettings = {};
  amount: number;
  type: number;
  expenseDate: Date = new Date();
  myOptions: IMultiSelectOption[] = [];
  constructor(public dialogRef: MatDialogRef<AddExpenseComponent>, private expensesService: ExpensesService,
    private toastrService: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.myOptions = data;
   }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Pasirinkti visus',
      unSelectAllText: 'Atšaukti',
      searchPlaceholderText: 'Ieškoti',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  convertToMultiSelect(items: any): IMultiSelectOption {
    return items;
  }

  addExpense() {
    const assetIds = this.selectedItems.map(item => item.id);
    const expenseModel = {
      Description: '',
      ExpenseType: this.type,
      Amount: this.amount,
      ExpenseDate: this.expenseDate,
      AssetIds: assetIds
     };
     this.expensesService.addExpense(expenseModel).subscribe(response => {
      this.toastrService.success('Išlaida sėkmingai pridėta');
      this.dialogRef.close();
     }, error => {
       console.log(error);
     });
    }
}
