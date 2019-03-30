import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../shared/classes/cart-item';
import { CartService } from '../../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import { OrderItem } from 'src/app/_models/order-item';
import { ProductsService } from 'src/app/_services/products/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cartItems:   Observable<OrderItem[]> = of([]);
  public shoppingCartItems:   OrderItem[] = [];

  constructor(private productsService: ProductsService,
    private cartService: CartService) { }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.cartItems.subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
  }

  // Get Total
  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }

  // Remove cart items
  public removeItem(item: OrderItem) {
    this.cartService.removeFromCart(item);
  }

}
