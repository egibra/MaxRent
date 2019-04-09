import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Expense } from 'src/app/_models/expense-models/expense';
import { ToastrService } from 'ngx-toastr';
import { ExpensesService } from 'src/app/_services/expenses/expenses.service';

@Component ({
  selector: 'app-expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.scss']
})
export class ExpenseCardComponent implements OnInit {

  constructor(private toastrService: ToastrService, private expensesService: ExpensesService) { }
  @Input() expense: Expense;
  @Output() getExpensesChange = new EventEmitter<string>();
  ngOnInit() {
  }
  deleteExpense(id: number) {
      this.expensesService.deleteExpense(id).subscribe(() => {
        this.toastrService.success('Expense has been deleted');
        this.getExpensesChange.emit();
      }, error => {
        this.toastrService.error('Failed to delete the expense');
      });
  }
}
