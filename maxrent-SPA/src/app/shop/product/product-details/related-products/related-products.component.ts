import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/_services/products/products.service';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss']
})
export class RelatedProductsComponent implements OnInit {

  public products: Product[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getAllProducts().subscribe(product => this.products = product);
  }

}
