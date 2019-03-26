import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from 'src/app/_models/pagination';
import { Product } from 'src/app/_models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    let products: Product[];

      return this.http.get<Product[]>(this.baseUrl + 'product/GetAllProducts', { observe: 'response'}).pipe(map(
        response => {
            products = response.body;
            return products;
          }
      ));
  }

  getPaginatedProducts(page?, itemsPerPage?): Observable<PaginatedResult<Product[]>> {
    const paginatedResult: PaginatedResult<Product[]> = new PaginatedResult<Product[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Product[]>(this.baseUrl + 'product/GetAllProductsWithPagination', { observe: 'response', params}).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  deleteProduct(id: string) {
    return this.http.delete(this.baseUrl + id);
  }
}
