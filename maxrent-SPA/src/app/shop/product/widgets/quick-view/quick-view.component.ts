import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../../../shared/services/cart.service';
import { Product } from 'src/app/_models/product-models/product';
import { ProductsService } from 'src/app/_services/products/products.service';
declare var $: any;

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.scss']
})
export class QuickViewComponent implements OnInit, OnDestroy {

  public products:   Product[] = [];
  public counter = 1;
  public variantImage:   any = '';
  public selectedColor:   any = '';
  public selectedSize:   any = '';

  constructor(private productsService: ProductsService,
  private cartService: CartService) { }

  ngOnInit() {
    this.productsService.getAllProducts().subscribe(product => this.products = product);
  }

  ngOnDestroy() {
    $('.quickviewm').modal('hide');
  }

  public increment() {
      this.counter += 1;
  }

  public decrement() {
      if (this.counter > 1) {
          this.counter -= 1;
      }
  }

   // Change variant images
  public changeVariantImage(image) {
     this.variantImage = image;
     this.selectedColor = image;
  }

  // Change variant
  public changeVariantSize(variant) {
     this.selectedSize = variant;
  }
}
