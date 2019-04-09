import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AssetsService } from 'src/app/_services/assets/assets.service';
import { AssetForAdminListView } from 'src/app/_models/asset-models/asset-for-admin-list-view';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit {

  assets: AssetForAdminListView[];
  pagination: Pagination;
  assetForm: FormGroup;
  submitted = false;
  constructor(private toastrService: ToastrService, private assetsService: AssetsService,
    private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.pagination = new Pagination();
    this.pagination.currentPage = 1;
    this.pagination.itemsPerPage = 4;
    this.loadAssets();
    this.assetForm = this.formBuilder.group({
      title: ['', [Validators.required, , Validators.maxLength(20)]],
      content: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]]
  });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadAssets();
  }

  loadAssets() {
    this.assetsService.getPaginatedAssets(this.pagination.currentPage,
      this.pagination.itemsPerPage).subscribe((res: PaginatedResult<AssetForAdminListView[]>) => {
        this.assets = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.toastrService.error(error);
      });
  }

  onSubmit() {
    this.submitted = true;
  }

}
