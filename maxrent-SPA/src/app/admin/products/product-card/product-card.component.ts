import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../_models/product';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../../_services/products/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  constructor(private toastrService: ToastrService, private productsService: ProductsService) { }
  @Input() product: Product;
  @Output() getProductsChange = new EventEmitter<string>();
  ngOnInit() {
  }
  deleteproduct(id: string) {
      this.productsService.deleteProduct(id).subscribe(() => {
        this.toastrService.success('product has been deleted');
        this.getProductsChange.emit();
      }, error => {
        this.toastrService.error('Failed to delete the product');
      });
  }

}
