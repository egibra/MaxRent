import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { OrderItem } from 'src/app/_models/order-item';

// Get product from Localstorage
let orderItems: OrderItem [] = JSON.parse(localStorage.getItem('cartItem')) || [];

@Injectable({
  providedIn: 'root'
})

export class CartService {

  // Array
  public cartItems:  BehaviorSubject<OrderItem[]> = new BehaviorSubject([]);
  public observer:  Subscriber<{}>;

  constructor(private toastrService: ToastrService) {
      this.cartItems.subscribe(newProducts => orderItems = newProducts);
  }

  // Get Products
  public getItems(): Observable<OrderItem[]> {
    const itemsStream = new Observable(observer => {
      observer.next(orderItems);
      observer.complete();
    });
    return <Observable<OrderItem[]>>itemsStream;
  }


  // Add to cart
  public addToCart(newOrderItem: OrderItem): void {
    const canAddToCart = true;
   // canAddToCart = orderItems.filter(orderItem => orderItem.product.id === orderItem.product.id)[0] ? true : false;

    if (canAddToCart) {
    orderItems.push(newOrderItem);
    this.toastrService.success('Produktas pridėtas.');
    localStorage.setItem('cartItem', JSON.stringify(orderItems));
    } else {
     const prod = orderItems.filter(orderItem => {
       return orderItem.product.id === orderItem.product.id;
     })[0];

     prod.assetsCount += newOrderItem.assetsCount;
     prod.totalPrice += newOrderItem.totalPrice;
    }
  }

  // Removed in cart
  public removeFromCart(item: OrderItem): boolean {
    if (item === undefined) { return false; }
      const index = orderItems.indexOf(item);
      orderItems.splice(index, 1);
      localStorage.setItem('cartItem', JSON.stringify(orderItems));
  }

  // Total amount
  public getTotalAmount(): Observable<number> {
    return this.cartItems.pipe(map((orderItem: OrderItem[]) => {
      return orderItems.reduce((prev, curr: OrderItem) => {
        return prev + curr.totalPrice;
      }, 0);
    }));
  }


}
