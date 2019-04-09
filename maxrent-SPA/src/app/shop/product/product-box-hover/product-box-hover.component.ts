import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../../../shared/classes/cart-item';
import { ProductsService } from '../../../shared/services/products.service';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { CartService } from '../../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/_models/product-models/product';

@Component({
  selector: 'app-product-box-hover',
  templateUrl: './product-box-hover.component.html',
  styleUrls: ['./product-box-hover.component.scss']
})
export class ProductBoxHoverComponent implements OnInit {

  @Input() product: Product;

  constructor(private router: Router, public productsService: ProductsService,
    private wishlistService: WishlistService) {}

  ngOnInit() {
  }

  // Add to compare
  public addToCompare(product: Product) {
     this.productsService.addToCompare(product);
  }

  // Add to wishlist
  public addToWishlist(product: Product) {
     this.wishlistService.addToWishlist(product);
  }

}
