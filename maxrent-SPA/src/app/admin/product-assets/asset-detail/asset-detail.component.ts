import { Component, OnInit } from '@angular/core';
import { AssetsService } from 'src/app/_services/assets/assets.service';
import { AssetForDetailView } from 'src/app/_models/asset-for-detail-view';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { AssetOrderForDetailView } from 'src/app/_models/asset-order-for-detail-view';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss']
})
export class AssetDetailComponent implements OnInit {

  assetInfo: AssetForDetailView;
  assetOrders: AssetOrderForDetailView[];
  pagination: Pagination;

  constructor(private assetService: AssetsService, private route: ActivatedRoute,
    private toastrService: ToastrService) { }

  ngOnInit() {
   this.assetService.getAssetForDetailViewById(this.route.snapshot.paramMap.get('id'))
    .subscribe(asset => {
      this.assetInfo = asset;
      console.log(this.assetInfo);
    }, error => console.log(error));

    this.pagination = new Pagination();
    this.pagination.currentPage = 1;
    this.pagination.itemsPerPage = 5;
    this.loadAssetOrders();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadAssetOrders();
  }

  loadAssetOrders() {
    this.assetService.getPaginatedAssetOrders(this.pagination.currentPage,
      this.pagination.itemsPerPage, this.route.snapshot.paramMap.get('id')).subscribe((res: PaginatedResult<AssetOrderForDetailView[]>) => {
        this.assetOrders = res.result;
        this.pagination = res.pagination;
        console.log(res.pagination);
        console.log(this.assetOrders);
      }, error => {
        this.toastrService.error(error);
      });
  }

}
