import { Component, OnInit } from '@angular/core';
import { AssetsService } from 'src/app/_services/assets/assets.service';
import { AssetForDetailView } from 'src/app/_models/asset-models/asset-for-detail-view';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { AssetOrderForDetailView } from 'src/app/_models/asset-models/asset-order-for-detail-view';
import { ToastrService } from 'ngx-toastr';
import { AddExpenseComponent } from '../../expenses/add-expense/add-expense.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss']
})
export class AssetDetailComponent implements OnInit {

  assetInfo: AssetForDetailView;
  assetOrders: AssetOrderForDetailView[];
  pagination: Pagination;
  assetExpenses: Observable<any[]>;
  constructor(private assetService: AssetsService, private route: ActivatedRoute,
    private toastrService: ToastrService, private dialog: MatDialog) { }

  ngOnInit() {
   this.assetService.getAssetForDetailViewById(this.route.snapshot.paramMap.get('id'))
    .subscribe(asset => {
        this.assetInfo = asset;
      },
        error => console.log(error)
    );

    this.assetExpenses = this.assetService.getAssetExpenses(this.route.snapshot.paramMap.get('id'));

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
      }, error => {
        this.toastrService.error(error);
      });
  }

  onCreateExpense() {
    console.log('clickedd');
    this.assetService.getAllProductAssets(this.route.snapshot.paramMap.get('id')).subscribe( assets => {
      const myOptions: IMultiSelectOption[] = [];
      assets.forEach(param => {
          myOptions.push({id: param.assetId, name: param.assetCode});
        });
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '30%';
        dialogConfig.data = myOptions;
        this.dialog.open(AddExpenseComponent, dialogConfig);
    });
  }

}
