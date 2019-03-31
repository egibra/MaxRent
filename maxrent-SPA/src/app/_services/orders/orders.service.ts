import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Order } from 'src/app/_models/order';

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
    console.log(params.toString());
    return this.http.get<number>(this.baseUrl + 'order/GetAvailableAssetsCount', { params: params} );
  }
  addOrder(order: Order): Observable<any> {
    return this.http.post(this.baseUrl + 'order/AddOrder', order, { observe: 'response'
    });
  }
}
