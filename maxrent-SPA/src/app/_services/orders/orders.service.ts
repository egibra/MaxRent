import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { OrderForCreation } from 'src/app/_models/order-for-creation';
import { PaginatedResult } from 'src/app/_models/pagination';
import { OrderForUserView } from 'src/app/_models/order-for-user-view';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getAvailableAssetsCount(productId, dateFrom: Date, dateTo: Date): Observable<number> {
    const params = new HttpParams()
    .set('productId', productId)
    .set('dateFrom', dateFrom.toDateString())
    .set('dateTo', dateTo.toDateString());
    return this.http.get<number>(this.baseUrl + 'order/GetAvailableAssetsCount', { params: params} );
  }

  addOrder(order: OrderForCreation): Observable<any> {
    return this.http.post(this.baseUrl + 'order/AddOrder', order, { observe: 'response'
    });
  }
  getPaginatedOrdersForUser(page?, itemsPerPage?, userId?): Observable<PaginatedResult<OrderForUserView[]>> {
    const paginatedResult: PaginatedResult<OrderForUserView[]> = new PaginatedResult<OrderForUserView[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null && userId != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
      params = params.append('pageSize', itemsPerPage);
      params = params.append('userId', userId);
    }

    return this.http.get<OrderForUserView[]>(this.baseUrl + 'order/GetUserOrders', { observe: 'response', params}).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }
}
