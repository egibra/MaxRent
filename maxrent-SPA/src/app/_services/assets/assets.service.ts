import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from 'src/app/_models/pagination';
import { Observable } from 'rxjs';
import { AssetForAdminListView } from 'src/app/_models/asset-for-admin-list-view';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPaginatedAssets(page?, itemsPerPage?): Observable<PaginatedResult<AssetForAdminListView[]>> {
    const paginatedResult: PaginatedResult<AssetForAdminListView[]> = new PaginatedResult<AssetForAdminListView[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<AssetForAdminListView[]>
    (this.baseUrl + 'asset/GetAllAssetsWithPagination', { observe: 'response', params}).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getAssetById(id): Observable<AssetForAdminListView> {
    return this.http.get<AssetForAdminListView>(this.baseUrl + 'asset/' + id);
  }
  deleteAsset(id: string) {
    return this.http.delete(this.baseUrl + 'asset/' + id);
  }
}
