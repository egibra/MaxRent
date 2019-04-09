import { Component, OnInit } from '@angular/core';
import { Expense } from '../../../_models/expense-models/expense';
import { Pagination, PaginatedResult } from '../../../_models/pagination';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExpensesService } from '../../../_services/expenses/expenses.service';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {

  expenses: Expense[];
  pagination: Pagination;
  expenseForm: FormGroup;
  submitted = false;
  constructor(private toastrService: ToastrService, private expensesService: ExpensesService,
    private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.expenseForm = this.formBuilder.group({
      title: ['', [Validators.required, , Validators.maxLength(20)]],
      content: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]]
  });
    this.pagination = new Pagination();
    this.expenses = [{id: 1, type: 'xx', description: 'xx',
    peopleReach: 150, cost: 100, dateCreated: '2019-03-16' },
    {id: 1, type: 'xx', description: 'xx',
    peopleReach: 150, cost: 100, dateCreated: '2019-03-16' },
    {id: 1, type: 'xx', description: 'xx',
    peopleReach: 150, cost: 100, dateCreated: '2019-03-16' },
    {id: 1, type: 'xx', description: 'xx',
    peopleReach: 150, cost: 100, dateCreated: '2019-03-16' }]; // PaginatedResult['expenses'].result;
    this.pagination.currentPage = 1;
    this.pagination.itemsPerPage = 3;
    this.pagination.totalItems = 4;
    this.pagination.totalPages = 2;
    console.log(this.pagination);
    //  this.route.data.subscribe(data => {
    //    console.log(data);
    //   this.expenses = data['expenses'].result;
    //   this.pagination = data['expenses'].pagination;
    // });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadExpenses();
  }

  loadExpenses() {
    this.expensesService.getExpenses(this.pagination.currentPage,
      this.pagination.itemsPerPage).subscribe((res: PaginatedResult<Expense[]>) => {
        this.expenses = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.toastrService.error(error);
      });
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.expenseForm.invalid) {
        return;
    }
    this.expensesService.addExpense(this.expenseForm.value).subscribe((expense: Expense) => {
      this.loadExpenses();
      this.toastrService.success('Expense inserted successfully');

    }, error => {
      this.toastrService.error(error);
    });
  }

}
