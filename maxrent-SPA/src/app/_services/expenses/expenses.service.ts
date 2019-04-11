import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from 'src/app/_models/pagination';
import { Expense } from 'src/app/_models/expense-models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }
  getExpenses(page?, itemsPerPage?): Observable<PaginatedResult<Expense[]>> {
    const paginatedResult: PaginatedResult<Expense[]> = new PaginatedResult<Expense[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<Expense[]>(this.baseUrl + 'expenses', { observe: 'response', params}).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        paginatedResult.result = [{id: 1, type: 'xx', description: 'xx',
              peopleReach: 150, cost: 100, dateCreated: '2019-03-16' } ];
        paginatedResult.pagination.itemsPerPage = 5;
        paginatedResult.pagination.currentPage = 1;
        paginatedResult.pagination.totalItems = 1;
        paginatedResult.pagination.totalPages = 1;
         return paginatedResult;
      })
    );
  }

  getExpense(id: string) {
    return this.http.get(this.baseUrl + 'expense/' + id);
  }

  getExpensesForChart() {
    return this.http.get(this.baseUrl + 'expense/GetExpensesForChart');
  }
  deleteExpense(id: number) {
    return this.http.delete(this.baseUrl + 'expense/' + id);
  }
  addExpense(expense: any) {
    return this.http.post(this.baseUrl + 'expense/AddExpense', expense, { observe: 'response'
  });
  }
}
