import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/_services/products/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  pagination: Pagination;
  productForm: FormGroup;
  submitted = false;
  constructor(private toastrService: ToastrService, private productsService: ProductsService,
    private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.pagination.currentPage = 1;
    this.pagination.itemsPerPage = 5;
    this.productForm = this.formBuilder.group({
      title: ['', [Validators.required, , Validators.maxLength(20)]],
      content: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]]
  });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getPaginatedProducts(this.pagination.currentPage,
      this.pagination.itemsPerPage).subscribe((res: PaginatedResult<Product[]>) => {
        this.products = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.toastrService.error(error);
      });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    // if (this.productForm.invalid) {
    //     return;
    // }
    // this.productsService.addproduct(this.productForm.value).subscribe((product: product) => {
    //   this.loadproducts();
    //   this.toastrService.success('product inserted successfully');

    // }, error => {
    //   this.toastrService.error(error);
    // });
  }

}
